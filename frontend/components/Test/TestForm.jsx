import React, { useState } from "react";
import useInput from "../hooks/useInput";
import axios from "axios";
const API_URL = "http://localhost:9090/v1/api/tests";

function TestForm(props) {
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
    <div className="px-4 py-4 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="text-center border-slate-800 ">
        <div className="flex justify-between mt-6">
          <label className="my-auto text-xl">투자금액</label>
          <input
            className="h-14 text-lg rounded-lg border-2 px-11"
            value={money}
            onChange={onChangeMoney}
            type="text"
            required
          ></input>
        </div>
        <div className="flex justify-between mt-6">
          <label className="my-auto text-xl">투자 날짜</label>
          <input
            className="h-14 text-lg rounded-lg border-2 px-6"
            value={time}
            onChange={onChangeTime}
            type="datetime-local"
            required
          ></input>
        </div>
        <div className="my-9">
          <button
            className="mt-9 border bg-blue-600 h-14 rounded-lg text-white font-bold w-full"
            type="submit"
            onClick={pop}
          >
            확인
          </button>{" "}
        </div>
      </form>
      <div className="flex  justify-between my-11 font-bold text-2xl">
        <p className="">투자 결과</p>
        <p>{Math.ceil(result).toLocaleString()}원</p>
      </div>
    </div>
  );
  function pop() {
    alert("예상 투자 결과");
  }
}

export default TestForm;
