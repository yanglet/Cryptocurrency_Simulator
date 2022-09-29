import { useRouter } from "next/router";
import React from "react";
import AuthService from "../../services/auth.service";
import useInput from "../hooks/useInput";

function SignUpForm(props) {
  const router = useRouter();
  const [email, onChangeEmail] = useInput("");
  const [name, onChangeName] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [balance, onChangeBalance] = useInput("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(balance, email, name, password).then(
        () => {
          router.replace("/");
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
    <div>
      <form className="text-center" onSubmit={onSubmitForm}>
        <div>
          <input
            className="w-1/4 h-14 text-lg rounded-lg border-2 mb-4 px-2"
            value={email}
            onChange={onChangeEmail}
            required
            placeholder="이메일"
          />
        </div>
        <div>
          <input
            className="w-1/4 h-14 text-lg rounded-lg border-2 mb-4 px-2"
            name="user-nickname"
            value={name}
            onChange={onChangeName}
            required
            placeholder="이름"
          />
        </div>
        <div>
          <input
            className="w-1/4 h-14 text-lg rounded-lg border-2 mb-4 px-2"
            value={balance}
            onChange={onChangeBalance}
            required
            placeholder="잔액"
          />
        </div>
        <div>
          <input
            className="w-1/4 h-14 text-lg rounded-lg border-2 mb-4 px-2"
            value={password}
            type="password"
            onChange={onChangePassword}
            required
            placeholder="비밀번호"
          />
        </div>
        <button
          className="mt-9 border bg-blue-600 w-1/4 h-14 rounded-lg text-white font-bold"
          type="submit"
        >
          회원가입
        </button>
      </form>
    </div>
  );
  
}
export default SignUpForm;
