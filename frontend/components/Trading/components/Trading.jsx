import React from 'react';
import Form from '../common/Form';

function Trading({ price }) {

    return (
        <div className=" bg-white mt-5 ">
        <div className="font-bold py-2 px-4">주문</div>
        <div className="grid grid-cols-2 ">
            <Form price={price} tradingType="매수" tradingPrice="매수가격" btnColor="py-3 px-36 bg-red-600 text-white rounded-lg" /> 
            <Form price={price} tradingType="매도" tradingPrice="매도가격" btnColor="py-3 px-36 bg-blue-600 text-white rounded-lg" />
        </div>
      </div>
    );
}

export default Trading;