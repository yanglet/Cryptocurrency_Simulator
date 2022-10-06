import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BALANCE } from "../../pages/config";
import authHeader from "../../services/auth-header";

export const BalanceContext = createContext({
    content: () => {},
});

export const BalanceProvider = ({children}) => {
    const [content, setContent] = useState([]);
    
    useEffect(() => {
        axios.get(`${BALANCE.BALANCE}`, {
            headers: authHeader()
        })
        .then((result) => {
            setContent(result.data)
        })
    }, [setContent]);    

    return(
        <BalanceContext.Provider value={content}>
            {children}
        </BalanceContext.Provider>
    )
}

