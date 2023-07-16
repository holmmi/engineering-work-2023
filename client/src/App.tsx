import MainProvider from './provider/MainProvider'
import AuthProvider from './provider/AuthProvider'
import { BrowserRouter } from 'react-router-dom'
import Router from './router/Router'
import Navigation from './components/Navigation/Navigation'
import { mainTheme } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'

const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <MainProvider>
          <AuthProvider>
            <BrowserRouter>
              <Navigation />
              <Router />
            </BrowserRouter>
          </AuthProvider>
        </MainProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
