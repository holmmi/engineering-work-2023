import {
  Box,
  Drawer as MuiDrawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material'
import { useDrawer, useBreakpoint } from 'hooks'
import { routes } from 'router'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft } from '@mui/icons-material'

export const DRAWER_WIDTH = '20%'

const Drawer = () => {
  const isSmallScreen = useBreakpoint('lg')
  const { isDrawerOpened, toggleDrawer } = useDrawer()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const drawerRoutes = routes.filter((route) => route.drawer)

  return (
    <MuiDrawer
      anchor="left"
      variant={isSmallScreen ? 'temporary' : 'persistent'}
      open={!isSmallScreen || isDrawerOpened}
      onClose={toggleDrawer}
      sx={{
        width: { lg: DRAWER_WIDTH },
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: { lg: DRAWER_WIDTH },
          boxSizing: 'border-box',
        },
      }}
    >
      {isSmallScreen && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
            padding: 1,
          }}
        >
          <IconButton size="large" onClick={toggleDrawer}>
            <ChevronLeft />
          </IconButton>
        </Box>
      )}
      <Divider />
      <List>
        {drawerRoutes.map((drawerRoute, index) => {
          const drawerItem = drawerRoute.drawer
          const routePath = t(drawerRoute.path)
          return (
            <ListItemButton
              LinkComponent={'a'}
              href={routePath}
              key={index}
              onClick={(event) => {
                event.preventDefault()
                navigate(routePath)
              }}
              selected={pathname === routePath}
            >
              <ListItemIcon>{drawerItem?.itemIcon}</ListItemIcon>
              <ListItemText primary={t(drawerItem?.itemName ?? '')} />
            </ListItemButton>
          )
        })}
      </List>
    </MuiDrawer>
  )
}

export default Drawer
