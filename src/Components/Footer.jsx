import React from 'react'
import {Box ,Stack, VStack, Avatar, Text} from '@chakra-ui/react'
import Chahat from '../Assets/Chahat_Photo.JPG'

const Footer = () => {
  return (
    <Box bgColor={'blackAlpha.900'} color={'white'} minH={'48'} px={'16'} py={['16','8']}>
         
         <Stack direction={['column' , 'row']} h={'full'} alignItems={'center'}>

         <VStack w={'full'} alignItems={['center', 'flex-start']}>
         <Text fontWeight={'bold'}>About us</Text>
         <Text fontSize={'sm'} letterSpacing={'widest'} textAlign={['center', 'left']}>We are the best Cryto Currency Trading App in the market at very cheap price </Text>
         </VStack>

         <VStack>
         
         <Avatar boxSize={'32'}name='' src={Chahat}  mt={['4','0']} />
         <Text fontFamily={'sans-serif'}>Chahat Gupta</Text>
         <Text fontFamily={'serif'}>Co Founder</Text>
         </VStack>
            
         </Stack>

    </Box>
  )
}

export default Footer
