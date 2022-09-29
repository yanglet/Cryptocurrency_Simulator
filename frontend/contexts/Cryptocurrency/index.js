import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { CRYPTOCURRENCY } from "../../pages/config";

export const CryptocurrencyContext = createContext({
    content: () => {},
});

export const CryptocurrencyProvider = ({children}) => {
    const [content, setContent] = useState([]);
    
    useEffect(() => {
        axios.get(`${CRYPTOCURRENCY.CRYPTOCURRENCY}`)
            .then((result) => {
                setContent(result.data)
            })
    }, [setContent]);    

    return(
        <CryptocurrencyContext.Provider value={content}>
            {children}
        </CryptocurrencyContext.Provider>
    )
}

