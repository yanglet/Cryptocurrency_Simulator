import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { ORDER } from "../../pages/config";
import authHeader from "../../services/auth-header";

export const OrdersContext = createContext({
    content: () => {},
});

export const OrdersProvider = ({children, status}) => {
    const [content, setContent] = useState([]);
    
    useEffect(() => {
        axios.get(`${ORDER.ORDER_LIST}?status=${status}`, {
            headers: authHeader()
        })
        .then((result) => {
            setContent(result.data)
        })
    }, [setContent, status]);    

    return(
        <OrdersContext.Provider value={content} status={status}>
            {children}
        </OrdersContext.Provider>
    )
}

