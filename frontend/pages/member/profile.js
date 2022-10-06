import React from "react";
import Head from "next/head";
import UserProfile from "../../components/User/UserProfile";

function profile(props) {
  return (
    <div className="mb-40 max-w-5xl mx-auto">
      <Head>
        <title>모의 투자 사이트 | 마이페이지</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="py-11 px-9 ">
        <div className="text-lg mb-4 pb-2 border-b-2 text-gray-600 font-bold">
          마이페이지
        </div>
        <UserProfile />
      </div>
    </div>
  );
}

export default profile;