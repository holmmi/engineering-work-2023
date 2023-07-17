import { createTheme, responsiveFontSizes } from '@mui/material'

const theme = createTheme({
  palette: {
    background: {
      default: '#E5E5E5',
    },
    primary: {
      main: '#DD6031',
    },
    secondary: {
      main: '#311E10',
    },
  },
  typography: {
    fontFamily: ['Lexend Variable', 'sans-serif'].join(','),
    h1: {
      fontSize: '4rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '100px',
          textTransform: 'none',
        },
      },
    },
  },
})

const mainTheme = responsiveFontSizes(theme)

export { mainTheme }
