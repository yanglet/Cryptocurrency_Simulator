import React from "react";

function TickerCategory({ categoryName, setCategoryName }) {
  let letter = "";
  if (categoryName === "main") {
    letter = "전체종목";
  } else if (categoryName === "holding") {
    letter = "보유";
  } else if (categoryName === "interest") {
    letter = "관심";
  }
  return (
    <div>
      <button onClick={() => setCategoryName(categoryName)}
      className="px-10 py-3 hover:border-b-4 hover:border-b-blue-900">{letter}</button>
    </div>
  );
}

export default TickerCategory;
