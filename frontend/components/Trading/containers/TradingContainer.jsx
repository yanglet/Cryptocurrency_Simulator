import React, {useState, useEffect, useContext} from 'react';
import { MembersProvider } from '../../../contexts/Member';
import Trading from '../components/Trading';
import { PriceContext } from '../../../contexts/Price';
import { CryptocurrencyContext } from '../../../contexts/Cryptocurrency';
import { CRYPTOCURRENCY } from '../../../pages/config';
import axios from 'axios';

function TradingContainer({ tickerId }) {
    const content = useContext(PriceContext)
 
    return (
        <div>
            <MembersProvider>
                { content && 
               <Trading content={content} tickerId={tickerId} />
                }
            </MembersProvider>         
        </div>
    );
}

export default TradingContainer;