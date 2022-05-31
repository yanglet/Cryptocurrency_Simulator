import React from 'react';

function BuyFormCategory({categoryName, setCategoryName}) {
    let letter = "";
    if(categoryName === "buy"){
        letter = "매수";
    } 
    else if(categoryName === "sell"){
        letter = "매도";
    } else if(categoryName === "order"){
        letter = "간편주문"
    } else if(categoryName === "trade"){
        letter = "주문내역"
    }
    return (
        <div>
      <button onClick={() => setCategoryName(categoryName)}
      className="px-10 py-3 hover:border-b-4 hover:border-b-blue-900">{letter}</button>
    </div>
    );
}

export default BuyFormCategory;