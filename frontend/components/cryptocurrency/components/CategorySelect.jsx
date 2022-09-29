import React from "react";

function CateogrySelect({ categoryName, setCategoryName }) {
  
  let letter = "";
  if (categoryName === "main") {
    letter = "전체종목";
  } else if (categoryName === "holding") {
    letter = "보유";
  } else if (categoryName === "interest") {
    letter = "관심";
  }

  return (
    <div className="bg-white">
      <button onClick={() => setCategoryName(categoryName)}
      className="py-3 px-11 hover:border-b-4 hover:border-b-gray-900 hover:font-bold hover:bg-gray-100" >{letter}</button>
    </div>
  );
}

export default CateogrySelect;
