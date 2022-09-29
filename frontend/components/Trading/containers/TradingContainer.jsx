import React, {useState, useEffect} from 'react';
import { useContext } from 'react';
import { CryptocurrencyContext } from '../../../contexts/Cryptocurrency';
import Trading from '../components/Trading';

function TradingContainer({ params, tickerId, setTickerId}) {
    const content = useContext(CryptocurrencyContext);
    const [price, setPrice] = useState("");
    const id = `${tickerId}` - 1;

    useEffect(() => {
        if(content && content.length > 0){
           setPrice(`${content[id].trade_price.toLocaleString()}`);
        }
    }, [content, id]);
    
    return (
        <div>
            <Trading price={price} tickerId={tickerId} />
        </div>
    );
}

export default TradingContainer;