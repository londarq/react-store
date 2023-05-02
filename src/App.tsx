import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
