import React from 'react';
import { useContext } from 'react';
import { LikeContext } from '../../../contexts/Like';

function Likes(props) {
    const content = useContext(LikeContext)
    console.log(content)
    return (
        <div>
        
        </div>
    );
}

export default Likes;