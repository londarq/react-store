import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1c1c1c',
      light: '#434343',
      dark: '#000000',
      contrastText: '#e53935',
    },
    secondary: {
      main: '#515151',
      light: '#7d7d7d',
      dark: '#292929',
      contrastText: '#4527a0',
    },
    text: {
      primary: '#e53935',
      secondary: '#4527a0',
    },
  },
})

export default theme
