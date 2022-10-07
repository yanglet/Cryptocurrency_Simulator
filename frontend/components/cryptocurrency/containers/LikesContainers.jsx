import React from 'react';
import { LikeProvider } from '../../../contexts/Like';
import Likes from '../common/Likes';

function LikesContainers(props) {
    return (
       <LikeProvider>
            <Likes />
       </LikeProvider>
    );
}

export default LikesContainers;