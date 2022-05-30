import Image from 'next/image';
import React from 'react';
import SignUpForm from '../components/User/SignUpForm';

function signup(props) {
    return (
        <div className='text-center my-12'>
            <p className='text-5xl mb-16'>모의투자 사이트</p>
            <p className='text-xl mb-16'>회원가입</p>
            <SignUpForm />
       </div>
    );
}

export default signup; 