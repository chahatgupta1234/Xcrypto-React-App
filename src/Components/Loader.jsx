import React from 'react'
import { Box, Spinner, Text, VStack } from '@chakra-ui/react'

const Loader = () => {
  return <VStack h={'90vh'} justifyContent={'center'}>
      <Box transform={'scale(2)'} color={'blue'}>
        <Spinner size={'xl'}/>
      </Box>
    </VStack> 
  
}

export default Loader
