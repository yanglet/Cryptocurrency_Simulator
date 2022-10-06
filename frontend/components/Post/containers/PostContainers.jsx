import React, { useContext } from 'react';
import { PostsContext } from '../../../contexts/Post';
import Post from '../components/Post';

function PostContainers(props) {
    const content = useContext(PostsContext)

    return (
        <div>
            <Post content={content} />
        </div>
    );
}

export default PostContainers;