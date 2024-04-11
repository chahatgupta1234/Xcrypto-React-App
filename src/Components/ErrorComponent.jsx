import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorComponent = ({msg}) => {
  return (
    <Alert justifyContent={'center'} color={'black'} h={'100vh'} bgColor={'white'} position={'fixed'}>
      <AlertIcon/>
      {msg}
    </Alert>
  )
}

export default ErrorComponent
