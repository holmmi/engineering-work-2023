import * as React from 'react'

export type User = {
  id: string
  email: string
  nickName?: string
  createdAt: string
}

interface MainContextProps {
  isDrawerOpened?: boolean
  user?: User
  setIsDrawerOpened?: React.Dispatch<React.SetStateAction<boolean>>
  setUser?: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const MainContext = React.createContext<MainContextProps>({})

interface MainProviderProps {
  children: React.ReactNode
}

const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  const [isDrawerOpened, setIsDrawerOpened] = React.useState(false)
  const [user, setUser] = React.useState<User | undefined>(undefined)

  return (
    <MainContext.Provider
      value={{ isDrawerOpened, user, setIsDrawerOpened, setUser }}
    >
      {children}
    </MainContext.Provider>
  )
}

export default MainProvider
