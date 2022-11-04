import React from 'react';
import { useContext } from 'react';
import { CryptocurrencyContext } from '../../../contexts/Cryptocurrency';
import Cryptocurrency from '../components';

function CryptocurrenciesContainer({ setMarket, tickerId, setTickerId, setKoreanName, setEnglishName}) {
    const content = useContext(CryptocurrencyContext);
    
    return (
        <div>
            <Cryptocurrency content={content} tickerId={tickerId} setKoreanName={setKoreanName} setEnglishName={setEnglishName} setMarket={setMarket} setTickerId={setTickerId} />
        </div>
    );
}

export default CryptocurrenciesContainer;