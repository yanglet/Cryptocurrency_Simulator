import React from 'react';
import Link from 'next/link';
function PostButton(props) {
    return (
        <div className='text-center mb-9'>
            <Link href="/createPost">
                <button className='bg-slate-200 rounded-xl w-24 h-8 '>쓰기</button>
            </Link>
        </div>
    );
}

export default PostButton;
