import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Ticker from "../../components/Ticker/index";

function Exchange(props) {
  const router = useRouter();
  const { params = [] } = router.query;
  console.log("params", params);

  return (
    <div>
      <div>
        <Head>
          <title>모의 투자 사이트 | 거래소</title>
        </Head>
        <Ticker params={params} />
      </div>
    </div>
  );
}

export default Exchange;
