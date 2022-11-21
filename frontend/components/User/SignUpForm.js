import { useRouter } from "next/router";
import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import useInput from "../../hooks/useInput";
import { TbRobot } from "react-icons/tb";

function SignUpForm(props) {
  const router = useRouter();
  const [email, onChangeEmail] = useInput("");
  const [name, onChangeName] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [balance, onChangeBalance] = useInput("");
  const [botYn, setBotYn] = useState("");

  const handleBotYn = (e) => {
    if (e.target.checked) {
      setBotYn("Y");
      console.log(botYn);
    } else {
      setBotYn("N");
      console.log(botYn);
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(balance, email, name, password, botYn).then(
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
      <form className="text-center w-100" onSubmit={onSubmitForm}>
        <div>
          <input
            className="w-1/3 h-14 text-lg rounded-lg border-2 mb-4 px-2"
            value={email}
            onChange={onChangeEmail}
            required
            placeholder="이메일"
          />
        </div>
        <div>
          <input
            className="w-1/3 h-14 text-lg rounded-lg border-2 mb-4 px-2"
            name="user-nickname"
            value={name}
            onChange={onChangeName}
            required
            placeholder="이름"
          />
        </div>
        <div>
          <input
            className="w-1/3 h-14 text-lg rounded-lg border-2 mb-4 px-2"
            value={balance}
            onChange={onChangeBalance}
            required
            placeholder="잔액"
          />
        </div>
        <div>
          <input
            className="w-1/3 h-14 text-lg rounded-lg border-2 mb-4 px-2"
            value={password}
            type="password"
            onChange={onChangePassword}
            required
            placeholder="비밀번호"
          />
        </div>
        <div className="border-2 inline-block w-1/3 h-14 rounded-lg">
          <div className="flex justify-between">
          <div className="py-3 text-lg mb-4 px-2 flex">
            <input
              className="w-4 rounded-lg"
              name="botYn"
              type="checkbox"
              value={botYn}
              onClick={(e) => handleBotYn(e)}
            />
            <p className="ml-4 text-gray-500">
              TraidingBot
            </p>
          </div>
          <div className="py-3 pr-2 text-blue-600">
            <TbRobot size="28" />

          </div>
          </div>
          
        </div>
        <div>
          <button
            className="mt-9 border-2 bg-blue-500 w-1/3 h-14 rounded-lg text-white font-bold"
            type="submit"
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
export default SignUpForm;
