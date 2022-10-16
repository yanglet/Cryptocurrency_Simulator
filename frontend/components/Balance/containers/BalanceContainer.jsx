import React from "react";
import { useContext } from "react";
import { BalanceContext, BalanceProvider } from "../../../contexts/Balance";
import { CalculationProvider } from "../../../contexts/Balance/calculation";
import Balance from "../components/Balance";
import List from "../components/List";

function BalanceContainer(props) {
  const content = useContext(BalanceContext);

  console.log("content", content);

  return (
    <div>
      {content && (
        <div>
          <div className='pt-6 px-9 text-gray-500 font-semibold text-lg'>
          내 보유자산
         </div>
         <CalculationProvider>
          <Balance />
        </CalculationProvider>
          <div className='py-6 px-9 text-gray-500 font-semibold text-lg'>
          보유자산 목록
          </div>
          <List content={content.orderItems} />
        </div>
      )}
    </div>
  );
}

export default BalanceContainer;
