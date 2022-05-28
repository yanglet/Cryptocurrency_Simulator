import React from 'react';
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function CandleChart({tickerName}) {
  let url = "http://localhost:9090/v1/api/cryptocurrencies";
  const { data, error } = useSWR(url, fetcher);

  return (
    <div>
      <p className='text-lg font-bold border-b'>{tickerName}</p>
     
    </div>
  );
}

export default CandleChart;