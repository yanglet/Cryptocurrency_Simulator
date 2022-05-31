import React from 'react';
import BuyPrice from './BuyPrice';
import SellPrice from './SellPrice';

function BuyFormTable({categoryName, tickerId}) {
    if(categoryName === "buy"){
        return(
            <BuyPrice tickerId={tickerId}  />
        )
    } else if (categoryName === "sell"){
        return(
            <SellPrice tickerId={tickerId} />
        )
    } else if(categoryName === "order"){
        return(
            <div>간편주문</div>
        )
    } else if(categoryName === "trade"){
        return(
            <div>거래내역</div>
        )
    }
}

export default BuyFormTable;