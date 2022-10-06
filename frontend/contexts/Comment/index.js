import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { COMMENT } from "../../pages/config";

export const CommentsContext = createContext({
    content: () => {},
});

export const CommentsProvider = ({children, id}) => {
    const [content, setContent] = useState([]);
    
    useEffect(() => {
        axios.get(`${COMMENT.COMMENT_LIST}/${id}/comments`)
        .then((result) => {
            setContent(result.data)
        })
    }, [id, setContent]);    

    return(
        <CommentsContext.Provider value={content} id={id}>
            {children}
        </CommentsContext.Provider>
    )
}

