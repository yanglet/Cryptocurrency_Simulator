import React, { useState } from "react";
import useInput from "../hooks/useInput";
import axios from "axios";
const API_URL = "http://localhost:9090/v1/api/tests";

function Test(props) {
  const [market, setMarket] = useState("KRW-BTC");
  const [money, onChangeMoney] = useInput("");
  const [time, onChangeTime] = useInput("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(API_URL, {
        market,
        money,
        time,
      })
      .then(function (response) {
        setResult(JSON.parse(response.data.money));
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="border rounded-lg px-4 py-4 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="text-center border-slate-800 ">
        <div className="flex justify-between mt-6">
          <label className="my-auto">마켓코드</label>
          <input
            className="border rounded-lg w-1/2 h-9 text-right"
            value={market}
            type="text"
          ></input>
        </div>
        <div className="flex justify-between mt-6">
          <label className="my-auto">투자금액</label>
          <input
            className="border rounded-lg w-1/2 h-9 text-right"
            value={money}
            onChange={onChangeMoney}
            type="text"
            required
          ></input>
        </div>
        <div className="flex justify-between mt-6">
          <label className="my-auto">투자 날짜</label>
          <input
            className="border rounded-lg w-1/2 h-9"
            value={time}
            onChange={onChangeTime}
            type="datetime-local"
            required
          ></input>
        </div>
        <div className="my-9">
          <button className="px-32 py-3 bg-slate-600 text-white" type="submit">확인</button>
        </div>
      </form>
      <div className="text-center">
        <p className="text-bold text-xl ">투자 결과</p>
        {Math.ceil(result).toLocaleString()}원</div>
    </div>
  );
}

export default Test;
