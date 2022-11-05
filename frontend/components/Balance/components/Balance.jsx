import React, { useState, useContext } from "react";
import { CalculationContext } from "../../../contexts/Balance/calculation";

function Balance() {
  const {
    purchaseAmount,
    valuationAmount,
    valuationRate,
    valuationLoss,
    holdings,
    balance,
  } = useContext(CalculationContext);

  return (
    <div className="px-9 py-11 border-b">
      <div className="grid grid-cols-2 text-center border-b pb-11">
        <div className="text-lg  grid grid-cols-2 w-96">
          <div className=" text-gray-500">보유 KRW</div>
          <div>{balance.toLocaleString(undefined, { maximumFractionDigits: 0 })} KRW</div>
        </div>
        <div className="text-lg grid grid-cols-2 w-96">
          <div className=" text-gray-500">총 보유자산 KRW</div>
          <div>
            {holdings.toLocaleString(undefined, { maximumFractionDigits: 0 })}{" "}
            KRW
          </div>
        </div>
      </div>
      <div className="gird grid-cols-2 text-center pt-4">
        <div className=" grid grid-cols-2">
          <div className="grid grid-cols-2 w-96">
            <div className=" text-gray-500">총 매수금액</div>
            <div>{purchaseAmount.toLocaleString()} KRW</div>
          </div>
          <div className="grid grid-cols-2 w-96">
            <div className=" text-gray-500 pr-12">총 평가손익</div>
            <div
              className={valuationLoss > 0 ? "text-red-600" : "text-blue-600"}
            >
              {valuationLoss.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{" "}
              KRW
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 py-2">
          <div className="grid grid-cols-2 w-96">
            <div className=" text-gray-500">총 평가금액</div>
            <div>
              {valuationAmount.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{" "}
              KRW
            </div>
          </div>
          <div className="grid grid-cols-2 w-96">
            <div className=" text-gray-500 pr-9">총 평가수익률</div>

            <div
              className={valuationLoss > 0 ? "text-red-600" : "text-blue-600"}
            >
              {Number(valuationRate).toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Balance;
