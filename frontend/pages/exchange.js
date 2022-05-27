import React from "react";
import Head from "next/head";
import Exchange from "../components/Exchange";

function exchange(props) {
  return (
    <div>
      <Head>
        <title>모의 투자 사이트 | 거래소</title>
      </Head>
      <Exchange />
    </div>
  );
}

export default exchange;
