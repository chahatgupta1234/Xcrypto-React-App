import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index';
import { Container, HStack, Text, VStack, Image, Heading } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
const Exchanges = () => {

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
   
      const fetchExchanges = async () => {
        try{
          const { data } = await axios.get(`${server}/exchanges`);
  
          setExchanges(data);
          setLoading(false);
        }

        catch (e) {
          setError(true);
          setLoading(false);
          console.log(e);
        }
      };
      fetchExchanges(); 

  }, []);

  if(error) return <ErrorComponent msg={"error while fetching data in exchanges component"}/>

  return (
    <Container mt={'16'} maxW={'container.xl'} bgColor={'white'}>
      {loading ? (
        <Loader />
        ) : (
       <>
          <HStack wrap={'wrap'} p={'4'} justifyContent={'space-evenly'} mt={'2'}>
          {
              exchanges.map((i) => (
              <ExchangeCard key={i.id} name={i.name} url={i.url} image={i.image} rank={i.
              trust_score_rank} country={i.country} year={i.year_established
} />
          )
          )
        }
          </HStack>
       </>
      )}
    </Container>

  );
};

const ExchangeCard = ({ name, url, image, rank, country, year }) => (
  <a href={url} target='blank'>
    <VStack mx={['0','2']} my={'1'} color={'black'} p={'1'} h={['200','180']} w={'11rem'} shadow={'lg'} transition={"all 0.5s"}
    css={
      {
        "&:hover":{
          transform: "scale(1.1)",
          color:'white',
          backgroundColor: 'black',
        },
      }
    }>
    
      <Image src={image} w='10' h='10' objectFit='container' alignItems={'center'} justifyContent={'center'}/>
      <Heading size={'md'} > {rank}</Heading>
      <Text fontFamily={'sans-serif'}> {name}</Text>
      <Text fontFamily={'fantasy'} >{country}</Text>
      <Text fontFamily={'monospace'} > Established in {year ? year : "NA"}</Text>
    </VStack>
  </a>
);
export default Exchanges
