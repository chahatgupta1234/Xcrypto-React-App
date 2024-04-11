import { Box, Container, Button, Text, VStack, Image, RadioGroup, Radio, HStack, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../index';
import ErrorComponent from './ErrorComponent';
import Chart from './Chart';

 
const CoinDetais = () => {

  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [curr, setCurr] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const btns=["24h","7d","14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats =(key)=>{

    switch (key) {
      case "24h":
        setDays("24h"); 
        setLoading(true); 
        break;

        case "7d":
        setDays("7d"); 
        setLoading(true); 
        break;

        case "14d":
        setDays("14d"); 
        setLoading(true); 
        break;

        case "30d":
        setDays("30d"); 
        setLoading(true); 
        break;

        case "60d":
        setDays("60d"); 
        setLoading(true); 
        break;

        case "200d":
        setDays("200d"); 
        setLoading(true); 
        break;

        case "1y":
          setDays("365d"); 
          setLoading(true); 
          break;

        case "max":
          setDays("max"); 
          setLoading(true); 
          break;


      default:
        setDays("24h"); 
        setLoading(true); 
        break;
    }
  }

  const params = useParams();

  const currSymbol =  curr === 'inr'? "₹" : curr === 'eur' ? "€" : "$";

  useEffect(() => {
   
    const fetchCoin = async () => {
      try{

        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${curr}&days=${days}`);

        setChartArray(chartData.prices);
        // console.log("chart data:  ",chartArray.prices);
        setCoin(data);
        setLoading(false);
      }

      catch (e) {
        setError(true);
        setLoading(false);
        console.log('the error jo h vo to ',e);
      }
    };
    console.log(coin);
    fetchCoin(); 

}, [params.id,days,curr]);

if(error) return <ErrorComponent msg={"error while fetching data in coins details"} />

  return (
    <Box w={'full'} h={'full'} bgColor={'white'} mt={'20'} >
    <Container maxW={'container.xl'} >
      {loading ? <Loader/> : (
        <Box bgColor={'white'} h={'full'} mt={'2'}>
        
          <Box w={'full'} borderWidth={1} mt={'2'}>
          <Chart arr={chartArray} currSymbol={currSymbol} days={days} />
          </Box>

          <HStack my={'5'} p={'4'} overflowX={'auto'}>
           { 
            btns.map((i) => (
              <Button color={'black'} key={i} onClick={()=>switchChartStats(i)} >{i}</Button>
            ))
            }
          </HStack>

        <RadioGroup value={curr} onChange={setCurr} p={"3"} mx={'2'} bgColor={'blackAlpha.300'} overflowX={'auto'}>

          <HStack spacing={'0'}>
            <Radio mx={['2','8']} value='inr' color={'blue'}><Text color={'blue'}>INR</Text></Radio>
            <Radio mx={['2','8']} value='eur' color={'blue'}><Text color={'blue'}>EURO</Text></Radio>
            <Radio mx={['2','8']} value='usd' color={'blue'}><Text color={'blue'}>USD</Text></Radio>
          </HStack>

       </RadioGroup>

       <VStack  spacing={'4'} p={'16'} alignItems={'flex-start'}>
       <Text color={'black'} fontSize={'small'} alignSelf={'center'}>
        Last Updated on {Date(coin.market_data.last_updated).split("G")[0]}
       </Text>

        {/*here coin is useState which contain the object of current coin*/}
       <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'} />

        <Stat color={'black'}>
        <StatLabel>{coin.name}</StatLabel>
        <StatNumber>{coin.market_data.current_price[curr]}</StatNumber>

        <StatHelpText>
          <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"}/>
          {coin.market_data.price_change_percentage_24h}%
        </StatHelpText>
        </Stat>

        <Badge fontSize={'2xl'} bgColor={'blackAlpha.800'} color='white' >
          {`#${coin.market_cap_rank}`}
        </Badge>

        <CustomBar low ={`${currSymbol}${coin.market_data.low_24h[curr]}`} high={`${currSymbol}${coin.market_data.high_24h[curr]}`}/>

          <Box w='full' p='4'>
            <Item title={"Max Supply"} value={coin.market_data.max_supply ? `${currSymbol}${coin.market_data.max_supply}` : "NA"}/>

            <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply ? `${currSymbol}${coin.market_data.circulating_supply}` : "NA"}/>

            <Item title={"Market Cap"} value={`${currSymbol}${coin.market_data.market_cap[curr]}`}/>

            <Item title={"All Time Low"} value={`${currSymbol}${coin.market_data.atl[curr]}`}/>

            <Item title={"All Time high"} value={`${currSymbol}${coin.market_data.ath[curr]}`}/>

          </Box>
        </VStack>
        </Box>
        
      )}
    </Container>

    </Box>
  )
}

const Item =({title,value})=>(

  <HStack color={'black'} justifyContent={'space-between'} w='full' my={'4'}>
    <Text fontFamily={'Bebas Neue'} >{title}</Text>
    <Text>{value}</Text>
  </HStack>

)


const CustomBar= ({low,high})=>(

  <VStack h={'full'} color={'black'} bgColor={'white'} w='full'>
    <Progress value={50} colorScheme='teal' w='full'/>
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children={low} colorScheme='red'/>
      <Text fontSize={'sm'}>24H Range</Text>
      <Badge children={high} colorScheme='green'/>
    </HStack>
  </VStack>

)

export default CoinDetais
