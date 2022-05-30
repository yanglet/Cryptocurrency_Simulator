import Link from "next/link";
import React, { useCallback } from "react";
import useInput from "./hooks/useInput";

function LoginForm({ setIsLoggedIn }) {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true);
  }, [id, password]);

  return (
    <div className="border max-w-lg mx-auto">
      <form className="text-center bg-rose-200" onSubmit={onSubmitForm}>
        <div>
          <label className="text-gray-700" htmlFor="user-id">
            아이디
          </label>
          <input
            className=""
            value={id}
            onChange={onChangeId}
            placeholder="아이디"
            type="text"
            name="user-id"
            required
          />
        </div>
        <div>
          <label className='text-gray-700" htmlFor="user-password'>비밀번호</label>
          <input
            className=""
            value={password}
            onChange={onChangePassword}
            type="password"
            placeholder="****"
            name="user-password"
            required
          />
        </div>
        <div>
          <button type="submit" onLoad={false}>로그인</button>
          <Link href="/signup">
            <a>
              <button>회원가입</button>
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
