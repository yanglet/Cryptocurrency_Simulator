import React, {useEffect, useState} from "react";
import useSWR from "swr";
import DayChart from "./DayChart";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function ChartCode({ tickerId }) {
  const [code, setCode] = useState('')
  const id = `${tickerId}` - 1;
 
  let url = "http://localhost:9090/v1/api/cryptocurrencies";

  const { data, error } = useSWR(url, fetcher);
  useEffect(() => {
    setCode(`${data[id].market}`);
  }, [code]);

  return (
    <DayChart code={code} />
  ) 
}

export default ChartCode;
