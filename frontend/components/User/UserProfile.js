import axios from "axios";
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
    <div>
      프로필
      <div>이름 : {content.name}</div>
      <div>이메일: {content.email} </div>
      <div>잔액: {content.balance}</div>
      {/* <div>랭킹:  </div> */}
      {/* <div>이익: {profit} </div> */}
    </div>
  );
}

export default UserProfile;
