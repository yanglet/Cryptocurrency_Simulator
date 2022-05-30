import React, { useEffect, useState } from "react";
import useSWR from "swr";
import BuyForm from "./BuyForm";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function BuyPrice({ tickerId }) {
  const [price, setPrice] = useState("");
  const id = `${tickerId}` - 1;

  let url = "http://localhost:9090/v1/api/cryptocurrencies";

  const { data, error } = useSWR(url, fetcher);
  
  useEffect(() => {
     if(data && data.length > 0){
        setPrice(`${data[id].trade_price.toLocaleString()}`);
     }
  });

  return (
  <div>
      <BuyForm price={price} />
  </div>
  )

}

export default BuyPrice;
