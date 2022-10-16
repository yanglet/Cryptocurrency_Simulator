import React, { useEffect, useState } from "react";
import Link from "next/link";

function HoldingTbody({ item, setTickerId }) {
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

        <td className={`flex justify-center py-4 ${color}`}>
          {(item.profit).toFixed(2)}%
        </td>
      </tr>
    </Link>
  );
}

export default HoldingTbody;