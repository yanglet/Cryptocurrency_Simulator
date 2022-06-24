import React, {useState , useEffect} from 'react';
import useSWR from "swr";
import Ex from './Ex';
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function CandleChart({tickerId, params}) {
  const id = `${tickerId}` - 1;

  let url = "http://localhost:9090/v1/api/cryptocurrencies";

  const { data, error } = useSWR(url, fetcher);
  
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <div className='flex'>
        <p className='text-2xl font-bold'>{data[id].korean_name}</p>
        <p className='my-auto text-sm ml-2'>{data[id].market}</p>
      </div>
      <div className='flex justify-between'>
        <p className='text-4xl font-bold'>{data[id].trade_price.toLocaleString()}</p>
        <div>
        <div className='flex'> 
          <p className='mr-11'>고가</p>
          <p className='mr-11'>{data[id].high_price.toLocaleString()}</p> 
          <p className='mr-11'>거래량(24H)</p>
          <p>{data[id].low_price.toLocaleString()}</p>
        </div>
        <div className='flex'> 
          <p className='mr-11'>저가</p>
          <p className='mr-11'>{data[id].low_price.toLocaleString()}</p>
          <p className='mr-11'>거래대금</p>
          <p className='text-sm'>{data[id].acc_trade_price_24h.toLocaleString()}</p>
        </div>
        </div>
      </div>
  
      <Ex params={params}/>
      
    </div>
  );
}

export default CandleChart;