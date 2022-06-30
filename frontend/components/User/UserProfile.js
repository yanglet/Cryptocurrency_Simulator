import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";

function UserProfile(props) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    UserService.getMemberDetail().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="w-5/12 mx-auto border">
      <div className="text-center mx-auto">
        <div className="text-2xl font-bold rounded-full inline px-8 py-2 bg-slate-800 text-slate-200">
          MY PAGE
        </div>
        <div className="mt-24">
          <p className="my-2">이름</p>
          <p className="text-xl bg-slate-200 h-11 w-1/2 inline-block">
            {content.name}
          </p>
        </div>
        <div className="my-2">
          <p>이메일</p>
          <p className="text-xl bg-slate-200 h-11 w-1/2 inline-block ">
            {content.email}
          </p>
        </div>
        <div className="my-2">
          <p>잔액</p>
          <p className="text-xl bg-slate-200 h-11 w-1/2 inline-block	">
            {content.balance}
          </p>
        </div>
        <div className="mt-16">
          <button className="rounded-full text-xl border-slate-400 border-4 py-2 px-4">
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
