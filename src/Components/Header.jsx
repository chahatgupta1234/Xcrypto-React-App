import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <HStack p={'4'} bgColor={'black'} shadow={'base'} position={'fixed'} w={'full'} zIndex={'2'} top={'0'} left={'0'}>

    <Button variant={'unstyled'} color={'white'} >
      <Link to={'/'}>Home</Link> 
    </Button>

    <Button variant={'unstyled'} color={'white'} >
      <Link to={'/exchanges'}>Exchanges</Link> 
    </Button>

    <Button variant={'unstyled'} color={'white'} >
      <Link to={'/coins'}>Coins</Link> 
    </Button>

    </HStack>
  )
}

export default Header
