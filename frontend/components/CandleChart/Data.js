import React from 'react';
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Data(props) {
    const [open, setOpen] = useState('');
   
    let url = "http://localhost:9090/v1/api/candles/months?count=36&market=KRW-BTC";
    const { data, error } = useSWR(url, fetcher);

    {data && data.map((item) => (
        setOpen(item.opening_price);
        
    ))}

    return (
        <div>
            
        </div>
    );
}

export default Data;