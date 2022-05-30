import Link from "next/link";
import React, { useCallback } from "react";
import useInput from "../hooks/useInput";

function LoginForm({ setIsLoggedIn }) {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    console.log(id, password);
    setIsLoggedIn(true);
  }, [id, password]);

  return (
    <div className="border rounded-lg px-4 py-4 max-w-lg mx-auto">
      <form className="text-center " onSubmit={onSubmitForm}>
        <div className="flex justify-between mb-6">
          <label className="text-gray-700 w-full text-xl" htmlFor="user-id">
            아이디
          </label>
          <input
            className="text-xl rounded-lg border-2"
            value={id}
            onChange={onChangeId}
            
            type="text"
            name="user-id"
            required
          />
        </div>
        <div className="flex justify-between">
          <label className="text-gray-700 w-full text-xl" htmlFor="user-password">비밀번호</label>
          <input
            className="text-xl rounded-lg border-2"
            value={password}
            onChange={onChangePassword}
            type="password" 
            name="user-password"
            required
          />
        </div>
        <div className="mt-11">
          <button className="border rounded bg-slate-300 px-11 py-2 mr-6" type="submit">로그인</button>
          <Link href="/signup">
            <a>
              <button className="border rounded bg-slate-600 text-white px-11 py-2">회원가입</button>
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
