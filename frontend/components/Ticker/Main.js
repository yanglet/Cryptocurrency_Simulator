import React, { useState, useEffect } from "react";
import useSWR from "swr";
import BuySell from "../BuySell";
import CandleChart from "../CandleChart";
import Link from "next/link"
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
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Main({params}) {
  console.log("main:", `${params}`)
  let url = "http://localhost:9090/v1/api/cryptocurrencies";
  const { data, error } = useSWR(url, fetcher, {refreshInterval:1000});
  const [tickerId, setTickerId] = useState("1");

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  return (
    <div className="flex">
      <div className="w-2/5 ml-10">
        <table className="table-auto w-full">
          <thead className="bg-slate-300">
            <tr>
              {fisrtList.map((list, idx) => (
                <th key={idx} className="text-lg">
                  {list.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* 코인명 | 현재가 | 전일대비 | 거래대금 */}
            {data &&
              data.map((item) => (
                <Link href={`/exchange/${item.market}`}>
                <tr key={item.id}>
                  <td className="border text-center">
                    <button onClick={() => 
                        setTickerId(item.id)
                       }>
                      {item.korean_name}
                    </button>
                  </td>
                  <td className="border text-right">
                    <button onClick={() => setTickerId(item.id)}>
                      {item.trade_price.toLocaleString()}
                    </button>
                  </td>
                  <td className="border text-right">
                    <button onClick={() => setTickerId(item.id)}>
                      {(item.signed_change_rate * 100).toFixed(2)}
                    </button>
                  </td>
                  <td className="border flex justify-center">
                    <button onClick={() => setTickerId(item.id)}>
                      {Number(
                        String(item.acc_trade_price_24h.toFixed()).slice(0, -6)
                      ).toLocaleString()}
                    </button>
                    <p className="text-xs my-auto text-gray-400 tecxt-center">백만</p>
                  </td>
                </tr>
                </Link>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-3/5 mx-10">
        <div className="border">
          <CandleChart tickerId={tickerId} params={params} />
        </div>
        <div className="border mt-10">
          <BuySell tickerId={tickerId} params={params} />
        </div>
      </div>
    </div>
  );
}

export default Main;
