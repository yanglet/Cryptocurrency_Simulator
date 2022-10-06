import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { POST } from "../../pages/config";

export const PostsContext = createContext({
    content: () => {},
});

export const PostsProvider = ({children}) => {
    const [content, setContent] = useState([]);
    
    useEffect(() => {
        axios.get(`${POST.POST_LIST}`)
        .then((result) => {
            setContent(result.data)
        })
    }, [setContent]);    

    return(
        <PostsContext.Provider value={content}>
            {children}
        </PostsContext.Provider>
    )
}

