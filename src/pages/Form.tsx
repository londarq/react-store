import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface FormModel {
  title: string
  description: string
  price: number
  category: string
  thumbnail: string | undefined
}

const Form = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm<FormModel>({
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      category: '',
      thumbnail: '',
    },
  })

  const onSubmit = (data: FormModel) => {
    fetch('http://localhost:3000/products', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          navigate('/')
        }
      })
      .catch((err) => {})
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='title'
        control={control}
        rules={{
          required: { value: true, message: 'name field is required' },
        }}
        render={({ field, fieldState }) => (
          <TextField
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            value={field.value}
            variant='filled'
            sx={{ backgroundColor: 'white' }}
            label='enter name'
          />
        )}
      />
      <Controller
        name='category'
        control={control}
        rules={{
          required: { value: true, message: 'category field is required' },
        }}
        render={({ field, fieldState }) => (
          <TextField
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            value={field.value}
            variant='filled'
            sx={{ backgroundColor: 'white' }}
            label='enter category'
          />
        )}
      />
      <Controller
        name='description'
        control={control}
        rules={{
          required: { value: true, message: 'description field is required' },
        }}
        render={({ field, fieldState }) => (
          <TextField
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            value={field.value}
            variant='filled'
            sx={{ backgroundColor: 'white' }}
            label='enter description'
          />
        )}
      />

      <Controller
        name='price'
        control={control}
        rules={{
          min: { value: 10, message: 'price must be > 10' },
        }}
        render={({ field, fieldState }) => (
          <TextField
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            type='number'
            value={field.value}
            variant='filled'
            sx={{ backgroundColor: 'white' }}
            label='enter price'
          />
        )}
      />
      <Controller
        name='thumbnail'
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            value={field.value}
            variant='filled'
            sx={{ backgroundColor: 'white' }}
            label='enter image url'
          />
        )}
      />

      <Button
        type='submit'
        variant='contained'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifySelf: 'center',
          alignSelf: 'center',
        }}
      >
        Create
      </Button>
    </form>
  )
}

export default Form
