import React, {useState, useEffect} from 'react';
import useSWR from "swr";
import BuyFormCategory from './BuyFormCategory';
import BuyFormTable from './BuyFormTable';

const fetcher = (...args) => fetch(...args).then((res) => res.json());


function BuySell({tickerId}) {
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
                categoryName={categoryName} 
                tickerId={tickerId} 
                />
        </div>
    );
}

export default BuySell;