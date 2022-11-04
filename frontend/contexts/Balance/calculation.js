import { createContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { BALANCE, CRYPTOCURRENCY } from "../../pages/config";
import authHeader from "../../services/auth-header";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export const CalculationContext = createContext({
    balance: () => {},
    holdings: () => {},
    valuationAmount: () => {},
    valuationLoss: () => {},
    purchaseAmount: () => {},
    valuationRate: () => {},
});
export const CalculationProvider = ({children}) => {
    const [content, setContent] = useState([]);
    const [balance, setBalance] = useState([])
    const [holdings, setHoldings] = useState([]);   //보유금액
    const [valuationAmount, setValuationAmount] = useState([]);   //평가금액
    const [valuationLoss, setValuationLoss] = useState([])  //평가손익
    const [purchaseAmount, setPurchaseAmount] = useState([])    //매수 금액
    const [valuationRate, setValuationRate] = useState([])  //총평가수익률
    const { data, error} = useSWR(`${CRYPTOCURRENCY.CRYPTOCURRENCY}`, fetcher , { refreshInterval: 1000})

    useEffect(() => {
        axios.get(`${BALANCE.BALANCE}`, {
            headers: authHeader()
        })
        .then((result) => {
            setBalance(result.data.member[0].balance)
            setContent(result.data.orderItems)
        })
    }, [setContent, setBalance]);   

    useEffect(() => {
        // 총 매수 금액
        setPurchaseAmount(content.map(item => item.volume * item.price).reduce((prev, curr) => prev + curr, 0))
        // 총 평가 금액
        { data && 
        setValuationAmount(content.map(item => item.volume * data[item.coinId-1].trade_price).reduce((prev, curr) => prev + curr, 0)) }
        
    }, [content, data])

    useEffect(() => {
        // 총 평가 수익률 
        setValuationRate((valuationAmount - purchaseAmount) / purchaseAmount * 100)
        // 총 평가 손익 
        setValuationLoss(valuationAmount - purchaseAmount)
        // 총 보유자산
        setHoldings(balance + valuationAmount)
    }, [balance, purchaseAmount, valuationAmount, valuationRate]);

   
    const value = useMemo(() => ({ purchaseAmount, valuationAmount,valuationRate,valuationLoss,holdings,balance }), [purchaseAmount, valuationAmount,valuationRate,valuationLoss,holdings,balance, content ]);

    return(
        <CalculationContext.Provider value={value}>
            {children}
        </CalculationContext.Provider>
    )
}

