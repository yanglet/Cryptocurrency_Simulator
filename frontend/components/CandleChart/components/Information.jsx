import React from "react";

function Information({ content, tickerId, params }) {
  const id = `${tickerId}` - 1;
  console.log("id", id);

  return (
    <div>
      {content[id] && (
        <div className="bg-white px-4 py-4 mb-3 grid grid-cols-3 gap-12">
          <div>
            <div className="flex">
              <p className="text-2xl font-bold">{content[id].korean_name}</p>
              <p className="my-auto text-sm ml-2">{content[id].market}</p>
              <div className="my-auto text-center mx-3">
                {/* <Likes market={content[id].market} /> */}
              </div>
            </div>
            <div className="flex">
              <p className="text-4xl font-bold">
                {content[id].trade_price.toLocaleString()}
              </p>
              <p className="my-auto">KRW</p>
            </div>
          </div>
          <div className="col-span-2 my-auto">
            
            <div className="flex justify-between">
              <div>
                <div className="grid grid-cols-3">
                  <p>고가</p>
                  <p className="col-span-2">
                    {content[id].high_price.toLocaleString()}
                  </p>
                </div>
                <div className="grid grid-cols-3">
                  <p>저가</p>
                  <p className="col-span-2">
                    {content[id].low_price.toLocaleString()}
                  </p>
                  <p></p>
                </div>
              </div>
              <div className="pl-5">
                <div className="grid grid-cols-3 gap-8">
                  <p>거래량(24H)</p>
                  <div className="col-span-2 flex">
                    <p>{content[id].low_price.toLocaleString()}</p>
                    <p className="text-xs my-auto">KRW</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <p className="">거래대금(24H)</p>
                  <div className="col-span-2 flex">
                    <p>
                      {" "}
                      {Math.floor(
                        content[id].acc_trade_price_24h
                      ).toLocaleString()}
                    </p>
                    <p className="text-xs my-auto">KRW</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Information;
