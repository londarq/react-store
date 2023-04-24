import { TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchParams } from '../app/productsSlice'

const Filter = () => {
  const dispatch = useDispatch()
  const { searchParams } = useSelector((store: any) => store.products)

  return (
    <TextField
      name={'title'}
      value={searchParams.title}
      variant='filled'
      sx={{ backgroundColor: 'white' }}
      label='Looking For?'
      onChange={(ev) => dispatch(setSearchParams(ev.target.value))}
    />
  )
}

export default Filter
