import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { useBreakpoint, useDrawer } from 'hooks'
import Drawer, { DRAWER_WIDTH } from 'components/Drawer'
import { useTranslation } from 'react-i18next'

const Navigation = () => {
  const { isDrawerOpened, toggleDrawer } = useDrawer()
  const isSmallScreen = useBreakpoint('lg')
  const { t } = useTranslation()

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
          <IconButton
            onClick={toggleDrawer}
            sx={{ display: { lg: 'none' }, color: '#fff' }}
          >
            <Menu />
          </IconButton>
        )}
        <Typography variant="h6">{t('navigation.title')}</Typography>
      </Toolbar>
      <Drawer />
    </AppBar>
  )
}

export default Navigation
