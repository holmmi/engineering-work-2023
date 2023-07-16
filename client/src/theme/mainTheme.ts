import { createTheme, responsiveFontSizes } from '@mui/material'

let mainTheme = createTheme({
  palette: {
    background: {
      default: '#E5E5E5',
    },
  },
  typography: {
    fontFamily: ['Lexend Variable', 'sans-serif'].join(','),
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

mainTheme = responsiveFontSizes(mainTheme)

export { mainTheme }
