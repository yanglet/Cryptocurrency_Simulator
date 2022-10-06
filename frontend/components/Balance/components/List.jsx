import React from "react";

const headList = [
  "보유자산",
  "보유수량",
  "매수금액",
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
              <td>{item.koreanName}</td>
              <td>{Number(item.price * item.volume).toLocaleString()} KRW</td>
              <td> {Number(item.price).toLocaleString()} KRW</td>

            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default List;
