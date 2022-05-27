import React from "react";
import useSWR from 'swr';
import Holding from "./Holding";
import Interest from "./Interest";
import Main from "./Main";

function TickerTable({ categoryName }) {
  if (categoryName === "main") {
    return ( 
      <Main />
    );
  } else if (categoryName === "holding") {
    return (
      <Holding />
    )
  } else if(categoryName === "interest") {
    return (
      <Interest />
    );
  }
  return null;
}

export default TickerTable;
