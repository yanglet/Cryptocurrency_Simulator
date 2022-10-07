import React, { useEffect, useState } from "react";
import Link from "next/link";

function Tbody({ item, setTickerId }) {
  const [color, setColor] = useState("")

  useEffect(() => {
    { item.change === "RISE" && setColor("text-right text-red-600 font-semibold")}
    { item.change === "FALL" && setColor("text-right text-blue-600 font-semibold")}
    { item.change === "EVEN" && setColor("text-right text-gray-600 font-semibold")}
  }, [item.change]);

  return (
    <Link href={`/exchange/${item.market}`} key={item.id}>
      <tr
        className="border-y hover:bg-gray-200 cursor-pointer text-xs"
        onClick={() => setTickerId(item.id)}
      >
  
        <td className="text-center truncate">
            <p className="font-semibold text-xs">{item.korean_name}</p>
            <p className="text-xs text-gray-500">{item.market}</p>
        </td>
            <td className={color}>
            {item.trade_price.toLocaleString()}
        </td>
        <td className={color}>
            {(item.signed_change_rate * 100).toFixed(2)}%
        </td>
      
        <td className=" flex justify-center py-4">
          <button onClick={() => setTickerId(item.id)}>
            {Number(
              String(item.acc_trade_price_24h.toFixed()).slice(0, -6)
            ).toLocaleString()}
          </button>
          <p className="text-xs my-auto text-gray-400 tecxt-center">백만</p>
        </td>
      </tr>
    </Link>
  );
}

export default Tbody;
