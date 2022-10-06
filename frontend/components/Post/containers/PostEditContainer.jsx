import React, { useContext } from 'react';
import { PostDetailContext } from '../../../contexts/Post/detail';
import PostEdit from '../components/PostEdit';

function PostEditContainer(props) {
    const content = useContext(PostDetailContext)
    console.log(content)
    return (
        <div>
            <PostEdit value={content} />
        </div>
    );
}

export default PostEditContainer;