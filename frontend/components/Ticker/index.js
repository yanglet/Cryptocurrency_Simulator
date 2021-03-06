import React, {useState} from 'react';
import TickerCategory from './TickerCategory';
import TickerTable from './TickerTable';

function Ticker({params}) {
  const [categoryName, setCategoryName] = useState("main");

  return (
    <div className="my-10">
      {/* 검색 */}
      <div className="mt-10 w-1/3 ml-16 ">
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
      </div>
      <TickerTable 
        categoryName={categoryName}       
        params={params}  
      />
    </div>
  );
}

export default Ticker;