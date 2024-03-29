import React from "react";

const headList = ["보유자산", "보유수량", "매수평균가", "수익률", "평가손익"];

function List({ content, data }) {
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
              <td>
                {item.volume} {item.market.slice(-3)}
              </td>
              <td>{Number(item.price).toLocaleString(undefined, { maximumFractionDigits: 0 })} KRW</td>
              {/* profit */}
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
              <td
                className={
                  (
                    (data && data[item.coinId - 1].trade_price) *
                    (Number(
                      (data &&
                        data[item.coinId - 1].trade_price - Number(item.price)) /
                        Number(item.price)
                    ) *
                      Number(item.volume))
                  ) > 0
                    ? "text-red-600"
                    : (
                      (data && data[item.coinId - 1].trade_price) *
                      (Number(
                        (data &&
                          data[item.coinId - 1].trade_price - Number(item.price)) /
                          Number(item.price)
                      ) *
                        Number(item.volume))
                    ) < 0 && "text-blue-600"
                }
              >
                {(
                  (data && data[item.coinId - 1].trade_price) *
                  (Number(
                    (data &&
                      data[item.coinId - 1].trade_price - Number(item.price)) /
                      Number(item.price)
                  ) * 
                    Number(item.volume))
                ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                KRW
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default List;
