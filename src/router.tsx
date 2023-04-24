import { createBrowserRouter } from 'react-router-dom'
import Nav from './components/Nav'
import Basket from './pages/Basket'
import Form from './pages/Form'
import Home from './pages/Home'
import ErrorPage from './pages/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Nav />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products/add',
        element: <Form />,
      },
      {
        path: 'basket',
        element: <Basket />,
      },
    ],
  },
])

export default router
