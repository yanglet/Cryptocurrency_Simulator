import React, { useState } from "react";
import TickerCategory from "./TickerCategory";
import TickerTable from "./TickerTable";

function Ticker(props) {
  const [categoryName, setCategoryName] = useState("main");
  return (
    <div className="border">
      {/* 전체 종목 | 보유 | 관심 */}
      <div className="flex justify-between">
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
        <TickerTable 
          categoryName={categoryName}         
          />
      
    </div>
  );
}

export default Ticker;
