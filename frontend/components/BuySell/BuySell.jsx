import React from "react";
import BuyPrice from "./BuyPrice";
import SellPrice from "./SellPrice";

function BuySell({ tickerId }) {
  return (
    <div className=" bg-white mt-5 ">
      <div className="font-bold py-2 px-4">주문</div>
      <div className="grid grid-cols-2 ">
        <BuyPrice tickerId={tickerId} />
        <SellPrice tickerId={tickerId} />
      </div>
    </div>
  );
}

export default BuySell;
