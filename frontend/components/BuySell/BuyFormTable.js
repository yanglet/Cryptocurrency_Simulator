import React from 'react';
import BuyForm from './BuyForm';
import BuyPrice from './BuyPrice';

function BuyFormTable({categoryName, tickerId}) {
    if(categoryName === "buy"){
        return(
            <BuyPrice tickerId={tickerId}  />
        )
    } else if (categoryName === "sell"){
        return(
            <div>매수</div>
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