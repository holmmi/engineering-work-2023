import * as React from 'react'
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useAuth } from 'hooks'
import { Backdrop } from '@mui/material'
import { User } from './MainProvider'
import { getApiClient } from 'api'
import { CLIENT_ID } from 'config'

interface AuthProviderProps {
  children: React.ReactNode
}

interface AuthHandlerProps extends AuthProviderProps {
  scriptIsLoaded: boolean
}

export type UserToken = {
  access_token: string
  refresh_token: string
  scope: string
  token_type: string
  id_token: string
  expiry_date: number
}

const TOKENS = 'tokens'

const AuthHandler: React.FC<AuthHandlerProps> = ({
  children,
  scriptIsLoaded,
}) => {
  const { isUserAuthenticated, setAuthenticatedUser } = useAuth()

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (tokenResponse) => getUserTokens(tokenResponse.code),
  })

  const getUserTokens = async (code: string) => {
    try {
      const response = await getApiClient().post<UserToken>('/api/token', {
        code,
      })
      window.localStorage.setItem(TOKENS, JSON.stringify(response.data))
      getUserDetails()
    } catch (error) {
      // Axios errors are handled globally
    }
  }

  const getUserDetails = React.useCallback(async () => {
    try {
      const response = await getApiClient().get<User>('/api/user')
      setAuthenticatedUser(response.data)
    } catch (error) {
      // Axios errors are handled globally
    }
  }, [setAuthenticatedUser])

  React.useEffect(() => {
    if (scriptIsLoaded) {
      const tokens = window.localStorage.getItem(TOKENS)
      if (!tokens) {
        login()
      } else {
        const userToken = JSON.parse(tokens) as UserToken
        if (userToken.expiry_date <= Date.now()) {
          login()
        } else {
          getUserDetails()
        }
      }
    }
    // eslint-disable-next-line
  }, [login, scriptIsLoaded])

  React.useEffect(() => {
    // Refresh user's tokens every 5 minutes if necessary
    const intervalId = setInterval(async () => {
      const tokens = window.localStorage.getItem(TOKENS)
      if (tokens) {
        const userToken = JSON.parse(tokens) as UserToken
        const expiringIn = (userToken.expiry_date - Date.now()) / 1000
        if (expiringIn <= 15 * 60) {
          try {
            const response = await getApiClient().post<UserToken>(
              '/api/refresh',
              { refreshToken: userToken.refresh_token }
            )
            window.localStorage.setItem(TOKENS, JSON.stringify(response.data))
          } catch (error) {
            // Axios errors are handled globally
          }
        }
      }
    }, 5 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      {children}
      <Backdrop
        open={!isUserAuthenticated()}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      />
    </>
  )
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [scriptIsLoaded, setScriptIsLoaded] = React.useState<boolean>(false)

  return (
    <GoogleOAuthProvider
      clientId={CLIENT_ID}
      onScriptLoadSuccess={() => setScriptIsLoaded(true)}
    >
      <AuthHandler scriptIsLoaded={scriptIsLoaded}>{children}</AuthHandler>
    </GoogleOAuthProvider>
  )
}

export default AuthProvider
