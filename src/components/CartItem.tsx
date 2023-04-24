import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import {
  decreaseAmount,
  increaseAmount,
  removeFromCart,
} from '../app/productsSlice'
import CartType from '../models/CartType'

const CartItem = (cartItem: CartType) => {
  const dispatch = useDispatch()

  return (
    <Card sx={{ m: 2, display: 'flex', justifyContent: 'space-between' }}>
      <Stack sx={{ flexDirection: 'row' }}>
        <CardMedia
          component='img'
          sx={{ width: 300, height: 200 }}
          image={cartItem.product.thumbnail}
          alt={cartItem.product.title}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {cartItem.product.title}
          </Typography>
          <p>${cartItem.product.price * cartItem.amount}</p>
          <Button
            variant='text'
            onClick={() => dispatch(removeFromCart(cartItem.product.id))}
          >
            remove
          </Button>
        </CardContent>
      </Stack>

      <CardActions>
        <Button
          variant='outlined'
          onClick={() => dispatch(increaseAmount(cartItem.product.id))}
        >
          +
        </Button>

        <Button variant='contained'>{cartItem.amount}</Button>

        <Button
          variant='outlined'
          onClick={() => {
            if (cartItem.amount === 1) {
              dispatch(removeFromCart(cartItem.product.id))
              return
            }
            dispatch(decreaseAmount(cartItem.product.id))
          }}
        >
          -
        </Button>
      </CardActions>
    </Card>
  )
}

export default CartItem
