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
      <div className="">
        <div className="flex justify-center my-4">
          <div className="my-auto text-lg mr-8">이름</div>
          <input className="w-1/4 h-14 text-lg rounded-lg border-2 px-6 inline-block " value= {content.name} />    
        </div>
        <div className="flex justify-center my-4">
          <div className="my-auto text-lg mr-4">이메일</div>
          <input className="w-1/4 h-14 text-lg rounded-lg border-2 px-6 inline-block " value= {content.email} />    
        </div>
        <div className="flex justify-center my-4">
          <div className="my-auto text-lg mr-8">잔액</div>
          <input className="w-1/4 h-14 text-lg rounded-lg border-2 px-6 inline-block " value= {content.balance} />    
        </div>
        <button
          className="mt-9 border bg-blue-600 w-1/4 h-14 rounded-lg text-white font-bold"
          type="submit"
        >
          수정하기
        </button>
      </div>
   
  );
}

export default UserProfile;
