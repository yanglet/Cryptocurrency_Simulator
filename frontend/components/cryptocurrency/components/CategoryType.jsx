import React, {useState} from "react";
import CateogrySelect from "./CategorySelect";

function CategoryType({categoryName, setCategoryName }) {

  return (
    <div className="border">
      {/* 전체 종목 | 보유 | 관심 */}
      <div className="bg-white flex justify-between">
        {["main", "holding", "interest"].map((category, index) => {
          return (
            <CateogrySelect
              key={index}
              categoryName={category}
              setCategoryName={setCategoryName}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CategoryType;
