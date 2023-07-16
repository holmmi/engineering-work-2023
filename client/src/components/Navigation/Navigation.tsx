import { AppBar, IconButton, Toolbar } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { useBreakpoint, useDrawer } from 'hooks'
import Drawer, { DRAWER_WIDTH } from 'components/Drawer'

const Navigation = () => {
  const { isDrawerOpened, toggleDrawer } = useDrawer()
  const isSmallScreen = useBreakpoint('lg')

  return (
    <AppBar
      position="sticky"
      sx={{
        width: { lg: `calc(100% - ${DRAWER_WIDTH})` },
        ml: { lg: DRAWER_WIDTH },
      }}
    >
      <Toolbar>
        {!isDrawerOpened && isSmallScreen && (
          <IconButton onClick={toggleDrawer} sx={{ display: { lg: 'none' } }}>
            <Menu />
          </IconButton>
        )}
      </Toolbar>
      <Drawer />
    </AppBar>
  )
}

export default Navigation
