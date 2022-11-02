import Link from "next/link";
import React from "react";

function CateogrySelect({ categoryName, setCategoryName }) {
  let letter = "";
  if (categoryName === "balance") {
    letter = "보유자산";
  } else if (categoryName === "history") {
    letter = "거래내역";
  } else if (categoryName === "wait_orders") {
    letter = "미체결";
  } else if (categoryName === "cancel_orders"){
    letter="취소내역"
  }

  return (
    <div className="bg-white">
      <Link href={`/investments/${categoryName}`}>
        <button
          onClick={() => setCategoryName(categoryName)}
          className="font-semibold text-gray-600 peer-checked:bg-red-600 py-3 px-11  hover:border-b-4 hover:border-b-gray-900 hover:font-bold hover:bg-gray-100"
        >
          {letter}
        </button>
      </Link>
    </div>
  );
}

export default CateogrySelect;
