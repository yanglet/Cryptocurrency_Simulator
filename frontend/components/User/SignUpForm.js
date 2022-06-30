import {useRouter} from 'next/router';

import React, { useState, useCallback } from "react";
import AuthService from "../../services/auth.service";
import useInput from "../hooks/useInput";

function SignUpForm(props) {
  const router = useRouter();
  const [email, onChangeEmail] = useInput("");
  const [name, onChangeName] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [balance, onChangeBalance] = useInput("");
  // const [passwordCheck, setPasswordCheck] = useState("");
  // const [passwordError, setPasswordError] = useState(false);

  // const onChangePasswordCheck = useCallback(
  //   (e) => {
  //     setPasswordCheck(e.target.value);
  //     setPasswordError(e.target.value !== password);
  //   },
  //   [password]
  // );

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(balance, email, name, password).then(
        () => {
          router.replace('/');
          //window.location.reload("/");
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
    // if (password != passwordCheck) {
    //   return setPasswordError(true);
    // }
    // console.log(id, nickname, password);
  };

  return (
    <div className="border rounded-lg px-4 py-4 max-w-lg mx-auto">
      <form onSubmit={onSubmitForm}>
        <div className="flex justify-between mb-6">
          <label className="text-gray-700 w-full text-xl" htmlFor="user-id">
            이메일
          </label>
          <input
            className="text-xl rounded-lg border-2"
            value={email}
            onChange={onChangeEmail}
            required
          />
        </div>
        <div className="flex justify-between mb-6">
          <label
            className="text-gray-700 w-full text-xl"
            htmlFor="user-nickname"
          >
            이름
          </label>
          <input
            className="text-xl rounded-lg border-2"
            name="user-nickname"
            value={name}
            onChange={onChangeName}
            required
          />
        </div>
        <div className="flex justify-between mb-6">
          <label className="text-gray-700 w-full text-xl" htmlFor="user-id">
            잔액
          </label>
          <input
            className="text-xl rounded-lg border-2"
            value={balance}
            onChange={onChangeBalance}
            required
          />
        </div>
        <div className="flex justify-between mb-6">
          <label
            className="text-gray-700 w-full text-xl"
            htmlFor="user-password"
          >
            비밀번호
          </label>
          <input
            className="text-xl rounded-lg border-2"
            value={password}
            type="password"
            onChange={onChangePassword}
            required
          />
        </div>
        <button
          className="mt-11 border rounded bg-slate-700 text-white px-16 py-2"
          type="submit"
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
export default SignUpForm;
