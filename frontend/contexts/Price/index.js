import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { CRYPTOCURRENCY } from "../../pages/config";

export const PriceContext = createContext({
  content: () => {},
});

export const PriceProvider = ({ children }) => {
    const [cryptocurrencyData, setCrytocurrencyData] = useState([])

    useEffect(() => { 
      axios.get(`${CRYPTOCURRENCY.CRYPTOCURRENCY}`)
      .then(function (result) {
        setCrytocurrencyData(result.data)
      })
    }, []);

  return (
    <PriceContext.Provider value={cryptocurrencyData}>
      {children}
    </PriceContext.Provider>
  );
};
