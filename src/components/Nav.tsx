import {
  AppBar,
  Badge,
  Button,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import { Link, Outlet } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import './Nav.css'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import CartType from '../models/CartType'
import bgImage from '../background.jpeg'
import Filter from './Filter'
import { setSearchParams } from '../app/productsSlice'

const Nav = () => {
  const { cart } = useSelector((store: any) => store.products)
  const dispatch = useDispatch()

  const basketAmount = useMemo(() => {
    if (!cart.length) {
      return
    }
    return (cart as CartType[])
      .map((x) => x.amount)
      .reduceRight((prev, current) => prev + current)
  }, [cart])

  return (
    <>
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

      <Grid container>
        <Grid
          item
          xs={2}
          sx={{
            position: 'sticky',
            top: '64.5px',
            height: 'calc(100vh - 64.5px)',
          }}
        >
          <List>
            <ListItem>
              <Filter />
            </ListItem>
            <ListItem
              button
              onClick={() => dispatch(setSearchParams(''))}
              key='All'
            >
              <ListItemText primary='All' />
            </ListItem>
            <ListItem
              button
              onClick={() => dispatch(setSearchParams('Apple'))}
              key='Apple'
            >
              <ListItemText primary='Apple' />
            </ListItem>
            <ListItem
              button
              onClick={() => dispatch(setSearchParams('test'))}
              key='test'
            >
              <ListItemText primary='test' />
            </ListItem>{' '}
          </List>
        </Grid>
        <Grid item xs={10}>
          <Paper
            sx={{
              width: '100%',
              minHeight: 'calc(100vh - 64.5px)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignContent: 'center',
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 650,
            }}
          >
            <Outlet />
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default Nav
