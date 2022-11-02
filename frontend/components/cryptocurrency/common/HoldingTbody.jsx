import React, { useEffect, useState } from "react";
import Link from "next/link";

function HoldingTbody({ item, setTickerId, data }) {
  const [color, setColor] = useState("");

  useEffect(() => {
    if(item.profit > 0){
      setColor("text-red-600")
    } else if(item.profit < 0 ){
      setColor("text-blue-600")
    } else if(item.profit === 0){
      setColor("text-black")
    }
  }, [item.profit])


  return (
    <Link href={`/exchange/${item.market}`} key={item.id}>
      <tr
        className="border-y hover:bg-gray-200 cursor-pointer text-xs"
        onClick={() => setTickerId(item.coinId)}
      >
        <td className="text-center truncate">
          <p className="font-semibold text-xs">{item.koreanName}</p>
          <p className="text-xs text-gray-500">{item.market}</p>
        </td>
        <td className="text-center">{item.volume.toFixed(4)}</td>
        <td className="text-center">{item.price}</td>

        {/* <td className={`flex justify-center py-4 ${color}`}>
          {Number(item.profit).toFixed(0)}%
        </td> */}
         <td
                className={
                  ((data &&
                    data[item.coinId - 1].trade_price - Number(item.price)) /
                    Number(item.price)) *
                    100 >
                  0
                    ? "text-red-600"
                    : ((data &&
                        data[item.coinId - 1].trade_price -
                          Number(item.price)) /
                        Number(item.price)) *
                        100 <
                        0 && "text-blue-600"
                }
              >
                {(
                  ((data &&
                    data[item.coinId - 1].trade_price - Number(item.price)) /
                    Number(item.price)) *
                  100
                ).toFixed(2)}
                %
              </td>
      </tr>
    </Link>
  );
}

export default HoldingTbody;
