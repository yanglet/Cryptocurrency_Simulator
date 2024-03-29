import React from "react";
import LoginForm from "../../components/User/LoginForm";
import Head from "next/head";
import Image from "next/image";
function login(props) {
  return (
    <div className="mb-40 max-w-5xl mx-auto">
    <Head>
      <title>모의 투자 사이트 | 로그인</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="py-11 px-9 text-center">
      <div className="text-4xl my-11 pb-9 px-36 font-bold ml-2 border-b-2 inline-block">
        로그인
      </div>
      <LoginForm />    
    </div>
    </div>
  );
}

export default login;
