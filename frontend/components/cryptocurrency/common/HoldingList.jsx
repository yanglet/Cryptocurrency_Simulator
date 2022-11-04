import React from 'react';
import HoldingTbody from './HoldingTbody';

function HoldingList({ listName , content, setTickerId, data}) {
    return (
        <div className="">
        <div className="bg-white border-x border-gray-300 overflow-y-scroll overflow-hidden sm:h-[73vw] 2xl:h-[51.3vw]">
          <table className="w-full table-auto text-sm ">
            <thead className="border-x-1 border-gray-900 ">
              <tr>
              {listName && listName.map((list, idx) => (
                <th key={idx} className="text-xs bg-gray-100 text-gray-600">
                  {list.title}
                </th>
              ))}
              </tr>
            </thead>
            <tbody>
              {/* 코인명 | 보유(평가금) | 매수평균가 | 수익률 */}
              {content &&
                content.map((item) => (
                 <HoldingTbody key={item.id} item={item} setTickerId={setTickerId} data={data} />
                ))}
            </tbody>
          </table>
        </div>
        </div>
    );
}

export default HoldingList;