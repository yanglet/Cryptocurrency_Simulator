import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { CANDLE } from "../../pages/config";

export const CandleContext = createContext({
    day: () => {},
    minute: () => {},
    month: () => {},
    week: () => {},
});

export const CandleProvider = ({children, params}) => {
    const [day, setDay] = useState([]);
    const [month, setMonth] = useState([]);
    const [week, setWeek] = useState([]);
    const [minute, setMinute] = useState([]);
    
    useEffect(() => {
        axios.get(`${CANDLE.DAYS}?market=${params}`)
            .then((result) => {
                setDay(result.data)
        })
    }, [params, setDay]);
    
    useEffect(() => {
        axios.get(`${CANDLE.MONTHS}?market=${params}`)
            .then((result) => {
                setMonth(result.data)
        })
    }, [params, setMonth]);    

    useEffect(() => {
        axios.get(`${CANDLE.WEEKS}?market=${params}`)
            .then((result) => {
                setWeek(result.data)
        })
    }, [params, setWeek]); 

    useEffect(() => {
        axios.get(`${CANDLE.MINUTES}/${minute}?market=${params}`)
            .then((result) => {
                setMinute(result.data)
        })
    }, [minute, params, setMinute]); 

    return(
        <CandleContext.Provider params={params} minute={minute} value={{day, month, week, minute}}>
            {children}
        </CandleContext.Provider>
    )
}
