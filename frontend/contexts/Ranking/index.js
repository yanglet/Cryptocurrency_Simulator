import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { RANKING } from "../../pages/config";

export const RankingContext = createContext({
    content: () => {},
});

export const RankingProvider = ({children}) => {
    const [content, setContent] = useState([]);
    
    useEffect(() => {
        axios.get(`${RANKING.LIST}`)
        .then((result) => {
            setContent(result.data)
        })
    }, [setContent,]);    

    return(
        <RankingContext.Provider value={content}>
            {children}
        </RankingContext.Provider>
    )
}

