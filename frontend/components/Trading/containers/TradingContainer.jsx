import React, {useState, useEffect} from 'react';
import { useContext } from 'react';
import { CryptocurrencyContext } from '../../../contexts/Cryptocurrency';
import { MembersProvider } from '../../../contexts/Member';
import Trading from '../components/Trading';

function TradingContainer({ tickerId }) {
    const content = useContext(CryptocurrencyContext);
    const [data, setData] = useState("")
    const id = `${tickerId}` - 1;

    // useEffect(() => {
    //     { content[id] && setData(content[id])}
    // }, [content, id]);
    
    return (
        <div>
            <MembersProvider>
                <Trading content={data} />
            </MembersProvider>
           
        </div>
    );
}

export default TradingContainer;