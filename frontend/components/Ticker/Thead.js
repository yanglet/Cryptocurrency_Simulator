import React from "react";

const fisrtList = [
  {
    id: 0,
    title: "",
  },
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

function Thead(props) {
  return (
    <thead className="bg-slate-300">
      <tr>
        {fisrtList.map((list, idx) => (
          <th key={idx} className="text-lg">
            {list.title}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
