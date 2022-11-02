import React, {useEffect, useState} from "react";
import { useContext } from "react";
import { BalanceProvider } from "../../../contexts/Balance";
import { MembersContext } from "../../../contexts/Member";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

function Trading({ content, tickerId }) {
  const member = useContext(MembersContext)
  console.log("멤버", member.balance)

  return (
    <div className=" ">
      <div className="font-bold py-2 px-4">주문</div>
      <div className="grid grid-cols-2 ">
        <BuyForm
          tickerId={tickerId}
          balance={member.balance}
          content={content}
          tradingType="매수"
          type="bid"
          tradingPrice="매수가격"
          btnColor="py-3 px-36 bg-red-600 text-white rounded-lg font-semibold"
        />
        <BalanceProvider>
        <SellForm
          tickerId={tickerId}
          content={content}
          tradingType="매도"
          type="ask"
          tradingPrice="매도가격"
          btnColor="py-3 px-36 bg-blue-600 text-white rounded-lg font-semibold"
        />
        </BalanceProvider>
      </div>
    </div>
  );
}

export default Trading;
