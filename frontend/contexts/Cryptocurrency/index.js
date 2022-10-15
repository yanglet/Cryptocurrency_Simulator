import { createContext } from "react";
import { CRYPTOCURRENCY } from "../../pages/config";
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export const CryptocurrencyContext = createContext({
  content: () => {},
});

export const CryptocurrencyProvider = ({ children }) => {
    const { data: content, error} = useSWR(`${CRYPTOCURRENCY.CRYPTOCURRENCY}`, fetcher, { refreshInterval: 1000})
    
    if (error) console.log("에러")
    if(!content) console.log("로딩중")


  return (
    <CryptocurrencyContext.Provider value={content}>
      {children}
    </CryptocurrencyContext.Provider>
  );
};
