import React, { useState } from "react";
import Head from "next/head";
import InvestmentsCategory from "../../components/Orders/components/InvestmentsCategory";
import { OrdersProvider } from "../../contexts/Order";
import OrdersContainers from "../../components/Orders/containers/OrdersContainers";

function WaitOrders(props) {
  const [categoryName, setCategoryName] = useState("balance");

  return (
    <div className="mb-20 max-w-5xl mx-auto">
      <Head>
        <title>모의 투자 사이트 | 거래내역</title>
      </Head>
      <InvestmentsCategory setCategoryName={setCategoryName} />
      <OrdersProvider status="wait">
        <OrdersContainers status="wait" />
      </OrdersProvider>
    </div>
  );
}

export default WaitOrders;
