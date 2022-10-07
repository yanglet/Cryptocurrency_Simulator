import Link from "next/link";
import React from "react";
import useInput from "../../hooks/useInput";
import { useRouter } from "next/router";
import AuthService from "../../services/auth.service";

function LoginForm() {
  const router = useRouter();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password).then(
        () => {
          window.location.replace("/member/profile");
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <form className="" onSubmit={onSubmitForm}>
        <input
          className="w-1/3 h-14 text-lg rounded-lg border-2 mb-4 px-2"
          value={email}
          onChange={onChangeEmail}
          type="text"
          required
          placeholder="이메일"
        />

        <div className="">
          <input
            className="w-1/3 h-14 text-lg rounded-lg border-2 mb-5 px-2"
            value={password}
            onChange={onChangePassword}
            type="password"
            required
            placeholder="비밀번호"
          />
        </div>

        <button
          className="mt-9 border-2 bg-blue-500 w-1/3 h-14 rounded-lg text-white font-bold"
          type="submit"
        >
          로그인
        </button>
        
      </form>
      <div className="mt-6 cursor-pointer text-gray-700">
        아직 회원이 아니신가요? &nbsp;
        <Link href="/member/signup">
          <u className="pb-1 text-blue-700">회원가입</u>
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
