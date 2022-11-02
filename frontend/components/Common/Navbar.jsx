import React, { useState, useEffect } from "react";
import Link from "next/link";
import AuthService from "../../services/auth.service";
import Image from "next/image";
import Button from "./Button";

const menu = [
  {
    id: 1,
    title: "거래소",
    path: "/exchange/KRW-BTC",
  },
  {
    id: 2,
    title: "투자내역",
    path: "/investments/balance",
  },
  {
    id: 3,
    title: "테스트",
    path: "/test",
  },
  {
    id: 4,
    title: "랭킹",
    path: "/ranking",
  },
  {
    id: 5,
    title: "커뮤니티",
    path: "/community",
  },
];

function Navbar() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logOut();
  };

  return (
    <div className="px-4 py-6 flex justify-between font-semibold">
      <div className="flex justify-star">
        {/* 로고 */}
        <Link href="/">
          <Image
            src="/images/moja.png"
            width={70}
            height={30}
            alt="로고 이미지"
          />
        </Link>
        {/* 메뉴 */}
        <div className="flex pl-7 font-semibold">
          {menu.map((item) => (
            <div key={item.id} className="my-auto mx-7 ">
              <Link href={item.path}>
                <a>{item.title}</a>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="my-auto">
        {currentUser ? (
          <div className="flex">
            <Button
              color="px-4 py-2 mr-4 border-2 border-blue-400 text-blue-400"
              src="/member/profile"
              title="프로필"
            />
            <button onClick={logOut}>
              <Button
                color="px-3 py-2 border-2  border-blue-400 px-8 bg-blue-500 text-white"
                title="로그아웃"
              />
            </button>
          </div>
        ) : (
          <div className="flex">
            <Button color="px-4 py-2 mr-4 border-2 border-blue-400 text-blue-400" src="/member/login" title="로그인" />
            <Button color="px-3 py-2 border-2 text-white border-blue-400 bg-blue-500" src="/member/signup" title="회원가입" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
