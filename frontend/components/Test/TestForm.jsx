import React, { useState } from "react";
import useInput from "../../hooks/useInput"
import axios from "axios";
import { URL } from "../../pages/config";
import TestResult from "./components/TestResult";

function TestForm(props) {
  const [market, setMarket] = useState("KRW-BTC");
  const [money, onChangeMoney] = useInput("");
  const [time, onChangeTime] = useInput("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${URL}/tests`, {
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

  function pop() {
    alert("비트코인 투자 예상 결과 보기");
  }

  return (
    <div className="grid grid-cols-2">
      <form onSubmit={handleSubmit} className="text-center border-r pr-7">
        <div className="flex justify-between mt-6">
          <label className="my-auto">투자금액</label>
          <input
            className="h-11 rounded-lg border-2 px-11"
            value={money}
            onChange={onChangeMoney}
            type="text"
            required
          ></input>
        </div>
        <div className="flex justify-between mt-6">
          <label className="my-auto">투자 날짜</label>
          <input
            className="h-11 rounded-lg border-2 px-6"
            value={time}
            onChange={onChangeTime}
            type="datetime-local"
            required
          ></input>
        </div>
        <div className="my-9">
          <button
            className="mt-9 border bg-blue-500 h-11 rounded-lg text-white font-bold w-full"
            type="submit"
            onClick={pop}
          >
            확인
          </button>{" "}
        </div>
      </form>
      <TestResult result={result} />
    </div>
  );
 
}

export default TestForm;
