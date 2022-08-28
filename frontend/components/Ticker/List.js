import React from "react";
import Link from "next/link";

const fisrtList = [
  {
    id: 1,
    title: "코인명",
  },
  {
    id: 2,
    title: "현재가",
  },
  {
    id: 3,
    title: "전일대비",
  },
  {
    id: 4,
    title: "거래대금",
  },
];

function List({ data, setTickerId }) {
  return (
    <div className="">
      <div className="bg-white border-x border-gray-300 overflow-y-scroll overflow-hidden sm:h-[73vw] 2xl:h-[51.3vw]">
        <table className="w-full table-fixed text-sm ">
          <thead className="border-x-1 border-gray-900 ">
            <tr>
              {fisrtList.map((list, idx) => (
                <th key={idx} className="text-sm bg-gray-100 text-gray-600">
                  {list.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* 코인명 | 현재가 | 전일대비 | 거래대금 */}
            {data &&
              data.map((item) => (
                <Link href={`/exchange/${item.market}`} key={item.id}>
                  <tr className="border-y hover:bg-gray-200 ">
                    <td className="text-center truncate">
                      <button onClick={() => setTickerId(item.id)}>
                        <p className="font-semibold ">{item.korean_name}</p>
                        <p className="text-xs text-gray-500">{item.market}</p>
                      </button>
                    </td>
                    <td className=" text-right">
                      <button onClick={() => setTickerId(item.id)}>
                        {item.trade_price.toLocaleString()}
                      </button>
                    </td>
                    <td className=" text-right">
                      <button onClick={() => setTickerId(item.id)}>
                        {(item.signed_change_rate * 100).toFixed(2)}
                      </button>
                    </td>
                    <td className=" flex justify-center py-4">
                      <button onClick={() => setTickerId(item.id)}>
                        {Number(
                          String(item.acc_trade_price_24h.toFixed()).slice(
                            0,
                            -6
                          )
                        ).toLocaleString()}
                      </button>
                      <p className="text-xs my-auto text-gray-400 tecxt-center">
                        백만
                      </p>
                    </td>
                  </tr>
                </Link>
              ))}
          </tbody>
        </table>
      </div>
      </div>
  );
}

export default List;
