import React from "react";
import Main from "./Main";
import Holding from "./Holding";
import Interest from "./Interest";

function TickerTable({ categoryName, params }) {
  if (categoryName === "main") {
    return ( 
      <Main params={params}/>
    );
  } else if (categoryName === "holding") {
    return (
      <Holding />
    )
  } else if(categoryName === "interest") {
    return (
      <Interest params={params}/>
    )
  }
  return null;
}

export default TickerTable;
