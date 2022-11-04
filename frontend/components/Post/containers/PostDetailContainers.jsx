import React, { useContext } from 'react';
import { PostDetailContext } from '../../../contexts/Post/detail';
import PostDetail from '../components/PostDetail';

function PostDetailContainers({id}) {
    const content = useContext(PostDetailContext)
    return (
        <PostDetail content={content} id={id} />  
    );
}

export default PostDetailContainers;