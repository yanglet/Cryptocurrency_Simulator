import React from "react";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fisrtList = [
  {
    id: 1,
    title: "코인명",
  },
  {
    id: 2,
    title: "마켓코드",
  },
  {
    id: 3,
    title: "현재가",
  },
];
function List(props) {
  let url = "http://localhost:9090/v1/api/cryptocurrencies";
  const { data, error } = useSWR(url, fetcher, { refreshInterval: 1000 });

  return (
      <div className="ml-24">
        <table className="table-auto w-2/3">
          <thead className="bg-slate-300">
            <tr>
              {fisrtList.map((list, idx) => (
                <th key={idx} className="text-lg">
                  {list.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* 코인명 | 마켓코드 | 현재가  */}
            {data &&
              data.map((item) => (
                <Link href={`/exchange/${item.market}`} key={item.id}>
                  <tr>
                    <td className="border text-center">{item.korean_name}</td>
                    <td className="border text-center">{item.market}</td>
                    <td className="border text-right">
                      {item.trade_price.toLocaleString()}
                    </td> 
                  </tr>
                </Link>
              ))}
          </tbody>
        </table>
      </div>
  );
}

export default List;
