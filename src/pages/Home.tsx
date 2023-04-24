import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Card'
import Product from '../models/Product'
import { setProducts } from '../app/productsSlice'
import Filter from '../components/Filter'
import { Drawer } from '@mui/material'

const fetchProducts = (searchParams: string) => {
  let requestString = 'http://localhost:3000/products'
  if (searchParams) {
    requestString += `?q=${searchParams}`
  }
  return fetch(requestString)
}

const Home = () => {
  const filterChangeTimeout = useRef<NodeJS.Timeout>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const { products, searchParams } = useSelector((store: any) => store.products)

  console.log('LOGGGGGG')

  const loadData = () => {
    setIsLoading(true)

    fetchProducts(searchParams)
      .then(async (data) => {
        const newProducts: Product[] = await data.json()
        dispatch(setProducts(newProducts))
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (filterChangeTimeout.current) {
      clearTimeout(filterChangeTimeout.current)
    }
    filterChangeTimeout.current = setTimeout(() => {
      loadData()
    }, 200)
  }, [searchParams])
  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      {/* <Drawer
        variant='permanent'
        sx={{
          width: 250,
          flexShrink: 0,
          alignItems: 'center',
          [`& .MuiDrawer-paper`]: { width: 250, boxSizing: 'border-box' },
        }}
      > */}
      <Filter />
      {/* </Drawer> */}

      {products.map((p: Product) => {
        return <Card key={p.id} {...p} />
      })}
    </>
  )
}

export default Home
