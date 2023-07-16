import { Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { routes } from './routes'
import { useTranslation } from 'react-i18next'
import Main from 'components/Main'
import { Box, CircularProgress } from '@mui/material'

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: (theme) => `calc(100vh - ${theme.mixins.toolbar.height})`,
      }}
    >
      <CircularProgress size={100} />
    </Box>
  )
}

const Router = () => {
  const { t } = useTranslation()

  return (
    <Main>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={t(route.path)}
            element={
              <Suspense fallback={<LoadingScreen />}>{route.view}</Suspense>
            }
          />
        ))}
        <Route
          path="*"
          element={<Navigate to={t('paths.frontPage')} replace={true} />}
        />
      </Routes>
    </Main>
  )
}

export default Router
