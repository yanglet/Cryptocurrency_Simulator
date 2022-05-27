import React from "react";
import useSWR from "swr";

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

function Main(props) {
  let url = "http://localhost:9090/testapi";
  const { data, error } = useSWR(url, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <table className="table-fixed">
      <thead className="bg-slate-300">
        <tr>
        {fisrtList.map((list) => (
              <th className="text-lg justify w-28">{list.title}</th>
        ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => ( 
          <tr key={item.id} className="text-center">
            <td>{item.name}</td>
            <td>{item.currentPrice}</td>
            <td>{item.changeRate}</td>
            <td>{item.accTradePrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Main;
