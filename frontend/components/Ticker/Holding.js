import React from 'react';
import useSWR from "swr";

const secondList = [
    {
      id: 1,
      title: "코인명",
    },
    {
      id: 2,
      title: "보유",
    },
    {
      id: 3,
      title: "매수평가금",
    },
    {
      id: 4,
      title: "수익률",
    },
  ];
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Holding(props) {
    let url = "http://localhost:9090/v1/api/cryptocurrencies";
  const { data, error } = useSWR(url, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

    return (
      <div className="flex">
      <div className="w-2/5 ml-10">
       <table className="table-fixed w-full">
      <thead className="bg-slate-300">
        <tr>
        {secondList.map((list, idx) => (
              <th key={idx} className="text-lg justify">{list.title}</th>
        ))}
        </tr>
      </thead>
      <tbody>
        {data && data.map((item, idx) => ( 
          <tr key={idx} className="text-center">
            <td>{item.korean_name}</td>
            <td>{item.signed_change_price}</td>
            <td>{item.signed_change_rate}</td>
            <td>{item.trade_price}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
    );
}

export default Holding;