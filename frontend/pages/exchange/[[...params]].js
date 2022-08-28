import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Ticker from "../../components/Ticker/index";
import CandleChart from "../../components/CandleChart";
import BuySell from "../../components/BuySell/BuySell";

function Exchange(props) {
  const router = useRouter();
  const [tickerId, setTickerId] = useState("1");

  const { params = [] } = router.query;
  console.log("params", params);

  return (
    <div className="bg-gray-100 py-11">
      <div className="2xl:mx-auto max-w-screen-2xl sm:mx-24">
        <Head>
          <title>모의 투자 사이트 | 거래소</title>
        </Head>
        <div className="grid 2xl:grid-cols-4 sm:grid-cols-3">
          {/* 카테고리 선택  + 종목*/}
          <div className="2xl:col-span-2 sm:mr-8">
            <Ticker
              params={params}
              tickerId={tickerId}
              setTickerId={setTickerId}
            />
          </div>
          <div className="col-span-2">
            {/* 차트 */}
            <CandleChart tickerId={tickerId} params={params} />
            {/* 매수매도 */}
            <BuySell tickerId={tickerId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exchange;
