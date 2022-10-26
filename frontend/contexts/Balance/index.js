import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BALANCE, CRYPTOCURRENCY} from "../../pages/config";
import authHeader from "../../services/auth-header";
import useSWR from "swr";
import { timeDay } from "d3";

export const BalanceContext = createContext({
    content: () => {},
});

const fetcher = (...args) => fetch(...args).then(res => res.json())

export const BalanceProvider = ({children}) => {
    const [content, setContent] = useState([]);
    const { data, error} = useSWR(`${CRYPTOCURRENCY.CRYPTOCURRENCY}`, fetcher, { refreshInterval: 1000})

    useEffect(() => {
        axios.get(`${BALANCE.BALANCE}`, {
            headers: authHeader()
        })
        .then((result) => {
            setContent(result.data)
        })
    }, [setContent]);    

    useEffect(()=> {
        {content.orderItems && content.orderItems.map((item) => {
            item["profit"] = (( data && data[item.coinId-1].trade_price - item.price) / (data && data[item.coinId-1].trade_price)) * 100 
            item["income"] =  (data && data[item.coinId-1].trade_price) * (item.profit && item.profit) * item.volume      
        })} 
    }, [data, content.orderItems])
    
    return(
        <BalanceContext.Provider value={content}>
            {children}
        </BalanceContext.Provider>
    )
}

