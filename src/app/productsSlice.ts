import { createSlice, Slice } from '@reduxjs/toolkit'
import { PayloadAction } from 'react-redux-typescript'
import Product from '../models/Product'
import CartType from '../models/CartType'

export type ProductsState = {
  products: Product[]
  cart: CartType[]
  searchParams: string
}

const initialState = {
  products: [],
  cart: [],
  searchParams: '',
} as ProductsState

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<string, string>) => {
      state.searchParams = action.payload
    },
    setProducts: (state, action: PayloadAction<string, Array<Product>>) => {
      state.products = action.payload
    },
    addToCart: (state, action: PayloadAction<string, Product>) => {
      const cartItemIndex = state.cart.findIndex(
        (x) => x.product.id === action.payload.id
      )
      if (cartItemIndex > -1) {
        state.cart[cartItemIndex].amount += 1
      } else {
        state.cart.push({
          amount: 1,
          product: action.payload,
        })
      }
    },
    removeFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item.product.id !== payload)
      console.log(payload)
    },
    increaseAmount: (state, { payload }) => {
      const id: number = state.cart.findIndex(
        (cartItem: CartType) => cartItem.product.id === payload
      )

      if (id > -1) {
        state.cart[id].amount += 1
      }
    },
    decreaseAmount: (state, { payload }) => {
      const id: number = state.cart.findIndex(
        (cartItem: CartType) => cartItem.product.id === payload
      )

      if (id === -1) {
        return
      }

      if (state.cart[id].amount === 1) {
        productsSlice.caseReducers.removeFromCart(state, payload)
        return
      }

      state.cart[id].amount -= 1
    },
  },
})

export const {
  setSearchParams,
  setProducts,
  addToCart,
  removeFromCart,
  increaseAmount,
  decreaseAmount,
} = productsSlice.actions

export default productsSlice.reducer
