import React from 'react';
import Tbody from './Tbody';

function List({ listName , content, tickerId, setTickerId}) {
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
              
              {/* 코인명 | 현재가 | 전일대비 | 거래대금 */}
              {content &&
                content.map((item) => (
                 <Tbody item={item} setTickerId={setTickerId} />
                ))}
            </tbody>
          </table>
        </div>
        </div>
    );
}

export default List;