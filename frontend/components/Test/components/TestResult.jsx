import React from "react";

function TestResult({ result }) {
  return (
    <div>
      {result ? (
        <div className="text-lg text-gray-600 pl-7 flex justify-between mt-6 font-bold">
          <p className="">예상 투자 결과</p>
          <p>{Math.ceil(result).toLocaleString()}원</p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default TestResult;
