import React, { useContext } from 'react';
import { BalanceContext } from '../../../contexts/Balance';
import Holding from '../components/Holding';

function HoldingContainer({tickerId, setTickerId}) {
    const content = useContext(BalanceContext)
    return (
        <div>
            { content && 
            <Holding content={content[0].orderItems} tickerId={tickerId} setTickerId={setTickerId} data={content[1]} />
}
        </div>
    );
}

export default HoldingContainer;