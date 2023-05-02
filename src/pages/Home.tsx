import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Card'
import Product from '../models/Product'
import { setProducts } from '../app/productsSlice'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

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

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
  }

  return (
    <>
      {products.map((p: Product) => {
        return <Card key={p.id} product={p} onOpenModal={handleOpenModal} />
      })}

      <Modal
        open={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paper sx={{ width: '80%', maxWidth: 600, mx: 'auto', my: 2, p: 2 }}>
            <Typography
              variant='h5'
              component='h2'
              id='modal-title'
              gutterBottom
            >
              {selectedProduct?.title}
            </Typography>
            <Typography variant='body1' id='modal-description' gutterBottom>
              {selectedProduct?.description}
            </Typography>
            <Button
              variant='contained'
              color='primary'
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </Paper>
        </Box>
      </Modal>
    </>
  )
}

export default Home
