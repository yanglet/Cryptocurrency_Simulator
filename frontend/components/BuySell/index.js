import React, {useState} from 'react';
import BuyFormCategory from './BuyFormCategory';
import BuyFormTable from './BuyFormTable';
function BuySell(props) {
    const [categoryName, setCategoryName] = useState("buy");

    return (
        <div>
            {/* 매수 | 매도 | 간편주문 | 거래내역 */}
            <div className='mt-10'>
                <div className='flex justify-between'>
                    {["buy", "sell", "order", "trade"].map((category, index) => {
                        return(
                            <BuyFormCategory 
                                key={index}
                                categoryName={category}
                                setCategoryName={setCategoryName}
                                />
                        );
                    })}
                </div>
            </div>
            <BuyFormTable 
                categoryName={categoryName} />
        </div>
    );
}

export default BuySell;