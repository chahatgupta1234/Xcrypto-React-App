import React from 'react'
import btc from '../Assets/btc.png';
import {Box, Text, Image} from '@chakra-ui/react'
import {motion} from 'framer-motion'; 

const Home = () => {
  return (
    <Box w='full' h='85vh' bgColor={'blackAlpha.900'} mt={'12'}>

    <motion.div style={{
      height: "80vh",
      top:"18",
    }}
    animate={
      {
        translateY: "20px",
      }
    }
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
    }}>
    <Image  w='full' h="full" objectFit={"contain"} src={btc} filter={'blur(1)'}/>

    </motion.div>
      <Text mt={'-10'} fontWeight={'thin'} fontSize={'6xl'} textAlign={'center'} color={'whiteAlpha.600'}>
        Xcrypto
      </Text>
    </Box>

  )
}

export default Home;
