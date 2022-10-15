import React, { useState, useEffect } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { LikeProvider } from "../../../contexts/Like";
import LikeContainer from "../../Like/containers/LikeContainer";

function Information({ content, tickerId, params }) {
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState();

  console.log(tickerId)
  const id = `${tickerId}` - 1;
  console.log("id", id);

  useEffect(() => {
    {
      content  &&
        (content[id].signed_change_price >= 0
          ? setIcon(<AiFillCaretUp />)
          : setIcon(<AiFillCaretDown />));
    }
  }, [content, id]);

  useEffect(() => {
    {
      content && content[id].change === "RISE" && setColor("text-red-600 ");
    }
    {
      content &&
        content[id].change === "FALL" &&
        setColor("text-blue-600 ");
    }
    {
      content && content[id].change === "EVEN" && setColor("text-gray-600");
    }
  }, [content, id]);

  return (
    <div className="border-b">
      
      { content && content[id] && (
        <div className="bg-white px-4 py-4 mb-3">
          <div className="flex justify-between">
            {/* 하트 */}
            <div className="flex">
              <div className="mx-2 mt-1">
                <LikeProvider>
                  <LikeContainer market={content[id].market} />
                </LikeProvider>
              </div>
              <div>
                {/* 코인명 코인가격 */}
                <div className="flex">
                  <p className="text-xl font-bold">{content[id].korean_name}</p>
                  <p className="my-auto text-sm ml-2 text-gray-600">
                    {content[id].market}
                  </p>
                </div>
                <div className="flex">
                  <p className={`text-3xl font-bold mr-2 ${color}`}>
                    {content[id].trade_price.toLocaleString()}
                  </p>
                  <p className={`${color} my-auto mx-2 font-semibold`}>
                    {(content[id].signed_change_rate * 100).toFixed(2)}%
                  </p>
                  <div className={`${color} my-auto mx-2 font-semibold flex`}>
                    <p className="my-auto">{icon}</p>
                    <p>
                      {Number(content[id].signed_change_price).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
            {/* 코인 정보 */}
            <div className="grid grid-cols-2 text-xs text-gray-500 mt-5">
              <div className="flex">
                <p className="mr-3">고가</p>
                <p className="text-red-600"> {content[id].high_price.toLocaleString()}</p>
              </div>
              <div className="flex">
                <p className="mr-6">거래량(24H)</p>
                <p> {content[id].low_price.toLocaleString()}</p>
              </div>
              <div className="flex">
                <p className="mr-3">저가</p>
                <p className="text-blue-600"> {content[id].low_price.toLocaleString()}</p>
              </div>
            
              <div className="flex">
                <p className="mr-3">거래대금(24H)</p>
                <p>
                  {" "}
                  {Math.floor(content[id].acc_trade_price_24h).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Information;
