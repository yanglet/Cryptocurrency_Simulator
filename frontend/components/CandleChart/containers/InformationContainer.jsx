import React from 'react';
import { useContext } from 'react';
import { CryptocurrencyContext } from '../../../contexts/Cryptocurrency';
import Information from '../components/Information';

function InformationContainer({ params, tickerId, setTickerId}) {
    const content = useContext(CryptocurrencyContext);
    
    return (
        <div>
            <Information content={content} params={params} tickerId={tickerId} setTickerId={setTickerId} />
        </div>
    );
}

export default InformationContainer;