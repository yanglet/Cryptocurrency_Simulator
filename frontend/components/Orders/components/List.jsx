import React from "react";

const headList = [
  "체결시간",
  "마켓명",
  "거래종류",
  "종류",
  "거래수량",
  "거래단가",
  "거래금액",
  "주문시간",
];

function List({ content }) {
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
              <td className="py-4">{item.modifiedTime}</td>
              <td>{item.koreanName}</td>
              {item.type === "bid" && <td className="text-red-600">매수</td>}
              {item.type === "ask" && <td className="text-blue-600">매도</td>}
              <td>{item.ordType === "limit" ? "지정가" : "시장가"}</td>
              <td>{item.volume}</td>
              <td> {Number(item.price).toLocaleString()} KRW</td>

              <td>{Number(item.price * item.volume).toLocaleString()} KRW</td>
              <td>{item.createTime}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default List;
