import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { MembersContext } from "../../contexts/Member";

function UserProfile(props) {
  const content = useContext(MembersContext)
  const [rank, setRank] = useState("");
  const [profit, setProfit] = useState("");

  const entries = Object.entries(content);

  useEffect(() => {
    entries.map(([key, val] = entry) => {
      if (key === "ranking") {
        const entries2 = Object.entries(val);
        entries2.map(([key, val] = entry) => {
          console.log(`${key} is ${val}`);
          if (key === "rank") {
            setRank(`${val}`);
          } else if (key === "profit") {
            setProfit(`${val}`);
          }
        });
      }
    });
  }, [entries]);

  return (
    <div>
      <div className="font-semibold">기본정보</div>

      <div className="grid grid-cols-2 py-7">
        <div className=" bg-gray-50 rounded-lg p-11">
          <div className="flex justify-between my-4">
            <div className="my-auto text-gray-400">이름</div>
            <div>{content.name}</div>
          </div>
          <div className="flex justify-between my-4">
            <div className="my-auto  text-gray-400">이메일</div>
            <div>{content.email}</div>
          </div>
          <div className="flex justify-between my-4">
            <div className="my-auto  text-gray-400">잔액</div>
            <div>{content.balance}</div>
          </div>
        </div>
        <div className="ml-6 bg-gray-50 rounded-lg p-11">
          <div className="flex justify-between my-4">
            <div className="my-auto  text-gray-400">투자랭킹</div>
            <div>{rank}</div>
          </div>
          <div className="flex justify-between my-4">
            <div className="my-auto  text-gray-400">투자이익</div>
            {profit >= 0 ? (
              <div className="text-red-500 font-semibold">{profit}%</div>
            ) : (
              <div className="text-blue-500 font-semibold">{profit}%</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
