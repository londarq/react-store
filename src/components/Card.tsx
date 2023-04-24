import Button from '@mui/material/Button'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material'
import Product from '../models/Product'
import { useDispatch } from 'react-redux'
import { addToCart } from '../app/productsSlice'

const ProductCard = (product: Product) => {
  const dispatch = useDispatch()

  return (
    <Card
      sx={{
        width: 345,
        m: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Stack>
        <CardMedia
          component='img'
          sx={{ height: 300 }}
          image={product.thumbnail}
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {product.title}
          </Typography>
          <p>{product.category}</p>
          <Typography variant='body1' color='text.secondary'>
            {product.description}
          </Typography>
        </CardContent>
      </Stack>
      <CardActions>
        <Button
          variant='contained'
          onClick={() => dispatch(addToCart(product))}
        >
          add to cart
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard