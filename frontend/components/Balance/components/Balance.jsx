import React from "react";

function Balance({ content }) {
  return (
    <div className="px-9 py-11 border-b">
      <div className="grid grid-cols-2 text-center border-b pb-11">
        <div className="text-lg  grid grid-cols-2 w-96">
          <div className=" text-gray-500">보유 KRW</div>
          { content.member && content.member.map((item) => (
          <div>{Number(item.balance).toLocaleString()} KRW</div>
          ))}
        </div>
        <div className="text-lg grid grid-cols-2 w-96">
          <div className=" text-gray-500">총 보유자산 KRW</div>
          <div></div>
        </div>
      </div>
      <div className="gird grid-cols-2 text-center pt-4">
        <div className=" grid grid-cols-2">
          <div className="grid grid-cols-2 w-96">
            <div className=" text-gray-500">총매수금액</div>
            <div>{Number(content.member).toLocaleString()} KRW</div>
          </div>
          <div className="grid grid-cols-2 w-96">
            <div className=" text-gray-500 pr-12">총평가손익</div>
            <div>{Number(content.member).toLocaleString()} KRW</div>
          </div>
        </div>

        <div className="grid grid-cols-2 py-2">
          <div className="grid grid-cols-2 w-96">
            <div className=" text-gray-500">총평가금액</div>
            <div>{Number(content.member).toLocaleString()} KRW</div>
          </div>
          <div className="grid grid-cols-2 w-96">
            <div className=" text-gray-500 pr-9">총평가수익률</div>
            
            <div>80%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Balance;
