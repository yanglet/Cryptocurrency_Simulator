import React, { useContext } from 'react';
import { BalanceContext } from '../../../contexts/Balance';
import Holding from '../components/Holding';

function HoldingContainer({tickerId, setTickerId}) {
    const content = useContext(BalanceContext)
    console.log("content", content)
    return (
        <div>
            <Holding content={content} tickerId={tickerId} setTickerId={setTickerId} />
        </div>
    );
}

export default HoldingContainer;