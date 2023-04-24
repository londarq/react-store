import { Alert, Paper, Typography } from '@mui/material'
import { useRouteError } from 'react-router-dom'
import { isRouteErrorResponse } from 'react-router-dom'
import bgImage from '../background.jpeg'

export default function ErrorPage() {
  const error = useRouteError()

  return (
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
      {isRouteErrorResponse(error) ? (
        <Alert severity='error'>
          <h1>Oops!</h1>
          <h2>{error.status}</h2>
          <p>{error.statusText}</p>
          {error.data?.message && <p>{error.data.message}</p>}
        </Alert>
      ) : (
        <div>Oops</div>
      )}
    </Paper>
  )
}
