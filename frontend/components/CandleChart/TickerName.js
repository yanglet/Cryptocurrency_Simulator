import React from 'react';
import CandleChart from './index';


function TickerName({tickerName}) {
    return (
       <CandleChart tickerName={tickerName} />
    );
}

export default TickerName;