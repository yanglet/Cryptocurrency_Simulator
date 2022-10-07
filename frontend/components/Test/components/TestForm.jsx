import React from "react";

function TestForm( { handleSubmit, money, onChangeMoney, time, onChangeTime } ) {
  function pop() {
    alert("예상 투자 결과", result);
  }
  return (
      <form onSubmit={handleSubmit} className="text-center border-slate-800 ">
        <div className="flex justify-between mt-6">
          <label className="my-auto ">투자금액</label>
          <input
            className="h-11 rounded-lg border-2 px-11"
            value={money}
            onChange={onChangeMoney}
            type="text"
            required
         />
        </div>
        <div className="flex justify-between mt-6">
          <label className="my-auto">투자 날짜</label>
          <input
            className="h-11 rounded-lg border-2 px-6"
            value={time}
            onChange={onChangeTime}
            type="datetime-local"
            required
          />
        </div>
        <div className="my-9">
          <button
            className="mt-9 border py-2 bg-blue-600 h-14 rounded-lg text-white font-bold w-full"
            type="submit"
            onClick={pop}
          >
            확인
          </button>{" "}
        </div>
      </form>
     
  );

}

export default TestForm;
