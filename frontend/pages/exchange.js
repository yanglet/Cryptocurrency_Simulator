import React from "react";
import Head from "next/head";
import Ticker from "../components/Ticker/index";

function exchange(props) {
  return (
    <div>
      <Head>
        <title>모의 투자 사이트 | 거래소</title>
      </Head>
   
      <Ticker />
    </div>
  );
}

export default exchange;
