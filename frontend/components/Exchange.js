import React from 'react';
import Ticker from './Ticker'
function Exchange(props) {
    return (
        <div className="flex my-10">
        {/* 검색 */}
        <div className='w-2/5 ml-10 border'>
            <Ticker />
        </div>
        <div className='w-3/5 mx-10'>
        <div className='border bg-rose-200 h-32'>
            {/* <Chart /> */}
        </div>
        <div className='border mt-10 bg-yellow-100 h-32'>
           {/* <BuySell /> */}
        </div>
        </div>
    </div>
    );
}

export default Exchange;