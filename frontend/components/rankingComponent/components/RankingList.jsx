import React from 'react';

const datas = [
    {
        id:1,
        rank: 1,
        email: "tpdls@gmail.com",
        name: "세인",
        profit: "+49.67"
    }, 
    {
        id:2,
        rank: 2,
        email: "tpdls@gmail.com",
        name: "현",
        profit: "+39.67"
    }, 
    {
        id:3,
        rank: 3,
        email: "tpdls@gmail.com",
        name: "세",
        profit: "-19.67"
    }
]

function RankingList({content}) {
    return (
        <div className='py-11 px-9 '>
            <div className='text-lg mb-9 pb-2 border-b-2 text-gray-600 font-bold'>
                투자 랭킹
            </div>
           <div className='text-center border rounded-lg bg-gray-100'>
              { content && content.map((data) => (
                <div key={data.id} className="grid grid-cols-3 my-3 mx-3 rounded-lg bg-white">
                    <div className='py-3 font-bold text-left ml-9'>{data.rank}</div>
                    <div className='py-3'>{data.name}({data.email})</div>
                    { data.profit > 0 ? <div className='py-3 text-red-600 font-semibold'>{data.profit}%</div> : <div className='py-3 text-blue-600 font-semibold'>{data.profit}%</div>}
                </div>
              ))}
           </div>
            
        </div>
    );
}

export default RankingList;