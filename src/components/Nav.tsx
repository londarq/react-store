import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import { Link, Outlet } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import './Nav.css'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import CartType from '../models/CartType'
import bgImage from '../background.jpeg'

const Nav = () => {
  const { cart } = useSelector((store: any) => store.products)

  const basketAmount = useMemo(() => {
    if (!cart.length) {
      return
    }
    return (cart as CartType[])
      .map((x) => x.amount)
      .reduceRight((prev, current) => prev + current)
  }, [cart])

  return (
    <div>
      <AppBar
        position={'sticky'}
        sx={{
          top: 0,
          zIndex: 10,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction={'row'} component={Link} to={'/'}>
            <IconButton
              size={'large'}
              edge={'start'}
              color={'inherit'}
              aria-label={'logo'}
            >
              <LocalMallIcon />
            </IconButton>
            <Typography variant={'h4'} component={'span'}>
              shop
            </Typography>
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <Button
              className='navBtn'
              color={'inherit'}
              component={Link}
              to={'/'}
            >
              ⌂
            </Button>
            <Button
              className='navBtn'
              color={'inherit'}
              component={Link}
              to={'products/add'}
            >
              ⨭
            </Button>
          </Stack>

          <Button color={'inherit'} component={Link} to={'basket'}>
            Basket
            <Badge badgeContent={basketAmount} color='success' sx={{ m: 0.5 }}>
              <ShoppingCartIcon />
            </Badge>
          </Button>
        </Toolbar>
      </AppBar>
      <Paper
        sx={{
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignContent: 'center',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 500,
        }}
      >
        <Outlet />
      </Paper>
    </div>
  )
}

export default Nav
