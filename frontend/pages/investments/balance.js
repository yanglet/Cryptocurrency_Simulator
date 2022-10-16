import React, { useState } from "react";
import Head from "next/head";
import InvestmentsCategory from "../../components/Orders/components/InvestmentsCategory";
import { BalanceProvider } from "../../contexts/Balance";
import BalanceContainer from "../../components/Balance/containers/BalanceContainer";

function Balance(props) {
  const [categoryName, setCategoryName] = useState("balance");

  return (
    <div className="mb-20 max-w-5xl mx-auto">
      <Head>
        <title>모의 투자 사이트 | 거래내역</title>
      </Head>
      <InvestmentsCategory setCategoryName={setCategoryName} />

      <BalanceProvider>
        <BalanceContainer />
      </BalanceProvider>
    </div>
  );
}

export default Balance;
