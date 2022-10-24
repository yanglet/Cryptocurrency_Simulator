import React, { useState, useEffect, useContext } from "react";
import { CalculationContext } from "../../../contexts/Balance/calculation";

function numberFormat(inputNumber) {
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Balance() {
  const { purchaseAmount, valuationAmount,valuationRate,valuationLoss,holdings,balance } = useContext(CalculationContext);
  const [color, setColor] = useState([]);

  useEffect(() => {
    if(valuationRate > 0){
      setColor("text-red-600")
    } else if(valuationRate < 0) {
      setColor("text-blue-600")
    } else if(valuationRate == 0){
      setColor("text-black")
    }
  }, [valuationRate])

  return (
    <div className="px-9 py-11 border-b">
      <div className="grid grid-cols-2 text-center border-b pb-11">
        <div className="text-lg  grid grid-cols-2 w-96">
          <div className=" text-gray-500">보유 KRW</div>
          <div>{balance.toLocaleString()} KRW</div>
        
        </div>
        <div className="text-lg grid grid-cols-2 w-96">
          <div className=" text-gray-500">총 보유자산 KRW</div>
          <div>{holdings.toLocaleString()} KRW</div>
        </div>
      </div>
      <div className="gird grid-cols-2 text-center pt-4">
        <div className=" grid grid-cols-2">
          <div className="grid grid-cols-2 w-96">
            <div className=" text-gray-500">총매수금액</div>
            <div>{purchaseAmount.toLocaleString()} KRW</div>
          </div>
          <div className="grid grid-cols-2 w-96">
            <div className=" text-gray-500 pr-12">총평가손익</div>
            <div>{numberFormat(Number(valuationLoss).toFixed())} KRW</div>
          </div>
        </div>

        <div className="grid grid-cols-2 py-2">
          <div className="grid grid-cols-2 w-96">
            <div className=" text-gray-500">총평가금액</div>
            <div>{numberFormat(Number(valuationAmount).toFixed())} KRW</div>
          </div>
          <div className="grid grid-cols-2 w-96">
            <div className=" text-gray-500 pr-9">총평가수익률</div>

            <div className={color}>{Number(valuationRate).toFixed()}%</div>

          </div>
        </div> 
      </div>
    </div>
  );
}

export default Balance;
