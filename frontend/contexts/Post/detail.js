import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { POST } from "../../pages/config";

export const PostDetailContext = createContext({
    content: () => {},
});

export const PostDetailProvider = ({children, id}) => {
    const [content, setContent] = useState([]);
    
    useEffect(() => {
        axios.get(`${POST.POST_LIST}/${id}`)
        .then((result) => {
            setContent(result.data)
        })
    }, [id, setContent]);    

    return(
        <PostDetailContext.Provider value={content} id={id}>
            {children}
        </PostDetailContext.Provider>
    )
}

