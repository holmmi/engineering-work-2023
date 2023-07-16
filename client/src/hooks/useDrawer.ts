import { useContext } from 'react'
import { MainContext } from '../provider/MainProvider'

export const useDrawer = () => {
  const { isDrawerOpened, setIsDrawerOpened } = useContext(MainContext)

  const toggleDrawer = () =>
    setIsDrawerOpened && setIsDrawerOpened(!isDrawerOpened)

  return {
    isDrawerOpened,
    toggleDrawer,
  }
}
