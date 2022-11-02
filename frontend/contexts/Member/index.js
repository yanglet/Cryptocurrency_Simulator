import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { MEMBER } from "../../pages/config";
import authHeader from "../../services/auth-header";

export const MembersContext = createContext({
    content: () => {},
});

export const MembersProvider = ({children}) => {
    const [content, setContent] = useState([]);
    
    useEffect(() => {
        axios.get(`${MEMBER.ME}`, {
            headers: authHeader()
        })
        .then((result) => {
            setContent(result.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [setContent]);    
    console.log("dd", content)
    
    return(
        <MembersContext.Provider value={content}>
            {children}
        </MembersContext.Provider>
    )
}

