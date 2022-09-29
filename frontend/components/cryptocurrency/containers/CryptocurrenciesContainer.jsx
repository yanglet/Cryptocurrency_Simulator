import React from 'react';
import { useContext } from 'react';
import { CryptocurrencyContext } from '../../../contexts/Cryptocurrency';
import Cryptocurrency from '../components';

function CryptocurrenciesContainer({ params, tickerId, setTickerId}) {
    const content = useContext(CryptocurrencyContext);
    
    return (
        <div>
            <Cryptocurrency content={content} tickerId={tickerId} setTickerId={setTickerId} />
        </div>
    );
}

export default CryptocurrenciesContainer;