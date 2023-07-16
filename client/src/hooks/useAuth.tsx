import { useContext } from 'react'
import { MainContext, User } from '../provider/MainProvider'

export const useAuth = () => {
  const { user, setUser } = useContext(MainContext)

  const isUserAuthenticated = (): boolean => user !== undefined
  const setAuthenticatedUser = (authenticatedUser: User) =>
    setUser && setUser(authenticatedUser)

  return {
    isUserAuthenticated,
    user,
    setAuthenticatedUser,
  }
}
