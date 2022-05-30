import React, { useState, useCallback } from "react";
import useInput from "../hooks/useInput";

function SignUpForm(props) {
  const [id, onChangeId] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    if (password != passwordCheck) {
      return setPasswordError(true);
    }
    console.log(id, nickname, password);
  }, [password, passwordCheck]);

  return (
    <div className="border rounded-lg px-4 py-4 max-w-lg mx-auto">
      <form onSubmit={onSubmitForm}>
        <div className="flex justify-between mb-6">
          <label className="text-gray-700 w-full text-xl" htmlFor="user-id">
            아이디
          </label>
          <input
            className="text-xl rounded-lg border-2"
            name="user-id"
            value={id}
            onChange={onChangeId}
            required
          />
        </div>
        <div className="flex justify-between mb-6">
          <label className="text-gray-700 w-full text-xl" htmlFor="user-nickname">닉네임</label>
          <input
           className="text-xl rounded-lg border-2"
            name="user-nickname"
            value={nickname}
            onChange={onChangeNickname}
            required
          />
        </div>
        <div className="flex justify-between mb-6">
          <label className="text-gray-700 w-full text-xl" htmlFor="user-password">비밀번호</label>
          <input
            className="text-xl rounded-lg border-2"
            name="user-password"
            value={password}
            type="password"
            onChange={onChangePassword}
            required
          />
        </div>
        <div className="flex justify-between">
          <label className="text-gray-700 w-full text-xl"  htmlFor="user-password-check">비밀번호체크</label>
          <input
          className="text-xl rounded-lg border-2"
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
        </div>
        {passwordError && <div className="mt-3 text-red-700">비밀번호가 일치하지 않습니다. </div>}
        <button className="mt-11 border rounded bg-slate-700 text-white px-16 py-2" type="submit">가입하기</button>
      </form>
    </div>
  );
}
export default SignUpForm;
