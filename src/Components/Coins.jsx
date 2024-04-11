import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index';
import { Link } from 'react-router-dom';
import { Container, HStack, Text, VStack, Image, Box, Heading, Button, RadioGroup, Radio } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
const Coins = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [curr, setCurr] = useState("inr")
  const arr= new Array(132).fill(1);

  const currSymbol =  curr === 'inr'? "₹" : curr === 'eur' ? "€" : "$";

  const changePage =(page)=>{
    console.log('jiii');
    setPage(page);
    setLoading(true);
  };
  useEffect(() => {
   
      const fetchCoin = async () => {
        try{
          const { data } = await axios.get(`${server}/coins/markets?vs_currency=${curr}&page=${page}`);
  
          setCoins(data);
          setLoading(false);
          
        }

        catch (e) {
          setError(true);
          setLoading(false);
          console.log(e);
        }
      };
      fetchCoin(); 

  }, [curr,page]); {/*It tells that when curr and page are chabges then re render it in all places*/}

  if(error) return <ErrorComponent msg={"error while fetching data in coins component"} />

  return (
    <Box w={'full'} h={'full'} bgColor={'white'} mt={'16'}>
    <Container maxW={'container.xl'} bgColor={'white'}>
      {loading ? (
        <Loader />
        ) : (
       <>
       <RadioGroup value={curr} onChange={setCurr} p={"4"} mx={'6'} mt={'2'}>

          <Radio mx={'6'} value='inr' color={'blue'}><Text color={'blue'}>INR</Text></Radio>
          <Radio mx={'6'} value='eur' color={'blue'}><Text color={'blue'}>EURO</Text></Radio>
          <Radio mx={'6'} value='usd' color={'blue'}><Text color={'blue'}>USD</Text></Radio>

       </RadioGroup>

          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
          {coins.map((i) => (
            <CoinCard
              key={i.id}
              id={i.id}
              name={i.name}
              image={i.image}
              symbol={i.symbol}
              price={i.current_price}
              currSymbol={currSymbol}
            />
          ))}

          </HStack>

          <HStack w={"full"} overflowX={'auto'} mt={'5'}>
           { arr.map((item,index)=>(
              <Button key={'index'} w={'full'} onClick={()=>changePage(index+1)} bgColor={'blackAlpha.900'} color={'white'}> {index+1} </Button>
            ))}
          </HStack>
       </>
      )}
    </Container>
    </Box>
  );
};

const CoinCard = ({ id, name, image, symbol, price, year,currSymbol='₹' }) => (
  <Link to={`/coin/${id}`} target='blank'>
    <VStack mx={'2'} my={'1'} color={'black'} p={'1'} h={'180'} w={'10rem'} shadow={'lg'} transition={"all 0.5s"}
    css={
      {
        "&:hover":{
          transform: "scale(1.1)",
          color:'white',
          backgroundColor: 'black',
        },
      }
    }>
    
      <Image src={image} w='10' h='10' objectFit='container' alignItems={'center'} justifyContent={'center'} />
      <Heading size={'md'} > {symbol}</Heading>
      <Text fontFamily={'sans-serif'}> {name}</Text>
      <Text fontFamily={'cursive'} > {price?` ${currSymbol} ${price} ` : "NA"} </Text>
    </VStack>
  </Link>
);

export default Coins;
