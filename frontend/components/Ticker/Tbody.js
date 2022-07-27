import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";

function DataList({ data }) {
  const [tickerId, setTickerId] = useState("1");

  return (
    <tbody>
      {/* 코인명 | 현재가 | 전일대비 | 거래대금 */}
      {data &&
        data.map((item) => (
          <Link href={`/exchange/${item.market}`}>
            <tr key={item.id}>
              <td className="border text-center">
                <button>
                  <AiOutlineHeart />
                </button>
              </td>
              <td className="border text-center">
                <button onClick={() => setTickerId(item.id)}>
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
                <p className="text-xs my-auto text-gray-400 tecxt-center">
                  백만
                </p>
              </td>
            </tr>
          </Link>
        ))}
    </tbody>
  );
}

export default DataList;
