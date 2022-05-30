import React from 'react';

function BuyForm(props) {
    return (
        <div className='mx-11 my-11'>
            <form>
                {/* 주문구분, 주문가능, 매수가격(KRW), 주문수량(GMT), 주문총액(KRW) */}
                <div className='flex justify-between'>
                <label className='my-auto'>주문구분</label>
                </div>
                <div className='flex justify-between mt-6'>
                    <label className='my-auto'>주문가능</label>
                    {/* 사용자의 자금 출력 */}
                    <div className='flex'>
                    <p className='font-bold text-xl'>0</p>
                    <p className='text-sm ml-3 my-auto text-gray-600'>KRW</p>
                    </div>
                </div>
                <div className='flex justify-between mt-6'>
                    <label className='my-auto'>매수가격</label>
                    <input className='border rounded-lg w-1/2 h-9'/>
                </div>
                <div className='flex justify-between mt-6'>
                    <label className='my-auto'>주문수량</label>
                    <input className='border rounded-lg w-1/2 h-9'/>
                </div>
                <div className='flex justify-between mt-6'>
                    <label className='my-auto'>주문총액</label>
                    <input className='border rounded-lg w-1/2 h-9'/>
                </div>
                <div className=''>
                    <button className='mx-14 my-11 px-11 py-3 bg-slate-300  '>초기화</button>
                    <button className='px-32 py-3 bg-red-600 text-white'>매수</button>
                </div>
                <div></div>
            </form>
            
        </div>
    );
}

export default BuyForm;