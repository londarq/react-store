import { useSelector } from 'react-redux'
import CartType from '../models/CartType'
import CartItem from '../components/CartItem'
import { Alert } from '@mui/material'

const Basket = () => {
  const { cart } = useSelector((store: any) => store.products)

  return (
    <>
      {cart && cart.length ? (
        <div>
          {cart.map((cartItem: CartType) => {
            return <CartItem key={cartItem.product.id} {...cartItem} />
          })}
        </div>
      ) : (
        <Alert severity='info'>Cart is empty</Alert>
      )}
    </>
  )
}

export default Basket
