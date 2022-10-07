import React from "react";
import { useContext } from "react";
import { MembersContext } from "../../../contexts/Member";
import Form from "../common/Form";

function Trading({ content }) {
  const member = useContext(MembersContext)
  console.log("멤버", member.balance)
  return (
    <div className=" ">
      <div className="font-bold py-2 px-4">주문</div>
      <div className="grid grid-cols-2 ">
        <Form
          balance={member.balance}
          content={content}
          tradingType="매수"
          type="bid"
          ordTypes={[
            {
              id: 1,
              title: "지정가",
              value: "limit",
            },
            {
              id: 2,
              title: "시장가",
              value: "price",
            },
          ]}
          tradingPrice="매수가격"
          btnColor="py-3 px-36 bg-red-600 text-white rounded-lg"
        />
        <Form
          content={content}
          tradingType="매도"
          type="ask"
          ordTypes={[
            {
              id: 1,
              title: "지정가",
              value: "limit",
            },
            {
              id: 2,
              title: "시장가",
              value: "market",
            },
          ]}
          tradingPrice="매도가격"
          btnColor="py-3 px-36 bg-blue-600 text-white rounded-lg"
        />
      </div>
    </div>
  );
}

export default Trading;
