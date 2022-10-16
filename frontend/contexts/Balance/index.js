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
    const [profit, setProfit] = useState([]);
    const { data, error} = useSWR(`${CRYPTOCURRENCY.CRYPTOCURRENCY}`, fetcher, { refreshInterval: 1000})

    useEffect(() => {
        axios.get(`${BALANCE.BALANCE}`, {
            headers: authHeader()
        })
        .then((result) => {
            setContent(result.data)
        })
    }, [setContent]);    

    // console.log("hi", content.orderItems)
    // console.log("hi2", data && data[7].trade_price)

    useEffect(()=> {
        {content.orderItems && content.orderItems.map((item) => {
            // console.log("hi3", item.koreanName, item.coinId, item.price , item.volume)
            item["profit"] = (((data && data[item.coinId-1].trade_price) - item.price) * item.volume ) / item.price * item.volume * 100
            // console.log("item", item)
        })}
    }, [content.orderItems, data, profit, setProfit])
    // console.log("contnet", content.orderItems[1])
    // console.log("profit", profit)

    return(
        <BalanceContext.Provider value={content}>
            {children}
        </BalanceContext.Provider>
    )
}

