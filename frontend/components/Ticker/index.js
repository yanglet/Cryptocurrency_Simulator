import React, { useState } from "react";
import TickerCategory from "./TickerCategory";
import TickerTable from "./TickerTable";

function Ticker({ params, tickerId, setTickerId }) {
  const [categoryName, setCategoryName] = useState("main");

  return (
    <div className="">
      {/* 전체 종목 | 보유 | 관심 */}
      <div className="bg-white flex justify-between">        
        {["main", "holding", "interest"].map((category, index) => {
          return (
            <TickerCategory
              key={index}
              categoryName={category}
              setCategoryName={setCategoryName}
            />
          );
        })}
      </div>
      <TickerTable categoryName={categoryName} params={params} tickerId={tickerId} setTickerId={setTickerId} />
    </div>
  );
}

export default Ticker;
