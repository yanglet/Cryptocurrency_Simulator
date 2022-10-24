import React, {useState, useCallback, useEffect} from "react";

const headList = [
  "보유자산",
  "보유수량",
  "매수평균가",
  "수익률",
  "평가손익"
];

function numberFormat(inputNumber) {
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



function List({ content }) {
  useEffect(() => {
    content && window.location.reload()
  }, [])

  return (
    <table className="w-full table-fixed">
      <thead className="bg-gray-100 text-gray-600">
        <tr>
          {headList.map((item, idx) => (
            <th key={idx} className="py-1">
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-center">
        {content &&
          content.map((item) => (
            <tr key={item.id}>
              <td>{item.koreanName}</td>
              <td>{item.volume} {item.market.slice(-3)}</td>
              <td>{Number(item.price).toLocaleString()} KRW</td>
              <td className={ item.profit > 0 ? "text-red-600" : item.profit < 0 && "text-blue-600"}>{Number(item.profit).toFixed(1)} % </td>
              <td className={ item.income > 0 ? "text-red-600" : item.income < 0 && "text-blue-600"}>{numberFormat(Number(item.income).toFixed())} KRW</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
} 

export default List;
