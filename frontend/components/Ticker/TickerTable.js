import React from "react";
import Main from "./Main";
import Holding from "./Holding";
import Interest from "./Interest";

function TickerTable({ categoryName, params, tickerId, setTickerId }) {
  console.log(categoryName)
  if (categoryName === "main") {
    return ( 
      <Main params={params} tickerId={tickerId} setTickerId={setTickerId} />
    );
  } else if (categoryName === "holding") {
    return;
      // <Holding />
    
  } else if(categoryName === "interest") {
    return (
      <Interest params={params} tickerId={tickerId} setTickerId={setTickerId} />
    )
  }
  return null;
}

export default TickerTable;
