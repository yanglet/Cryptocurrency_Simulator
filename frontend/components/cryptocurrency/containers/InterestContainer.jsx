import React from 'react';
import { useContext } from 'react';
import { LikeContext } from '../../../contexts/Like';
import Interest from '../components/Interest';

function InterestContainer({ tickerId, setTickerId}) {
    const content = useContext(LikeContext);
    
    return (
        <div>
            <Interest content={content} tickerId={tickerId} setTickerId={setTickerId} />
        </div>
    );
}

export default InterestContainer;