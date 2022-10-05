import axios from "axios";
import React from "react";
import { ORDER } from "../../../pages/config";
import authHeader from "../../../services/auth-header";

const headList = [
  "시간",
  "마켓명",
  "마켓",
  "종류",
  "주문수량",
  "주문가격",
  "미체결수량",
  "주문취소"
];
function handleCancle(orderId){
    axios.delete(`${ORDER.ORDER_LIST}/${orderId}`, {
        headers: authHeader()
    }).then(function(response) {
        alert("주문 취소")
        location.reload();

    })
    .catch(function(error) {
        console.log(error)
    })
}
function WaitList({ content }) {

    
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
              <td><button onClick={() => {handleCancle(item.id)}} className="bg-red-600 text-white rounded-xl p-1 text-sm">취소</button></td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default WaitList;
