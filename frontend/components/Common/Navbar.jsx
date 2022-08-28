import React, { useState, useEffect } from "react";
import Link from "next/link";
import AuthService from "../../services/auth.service";

const menu = [
  {
    id: 1,
    title: "거래소",
    path: "/exchange/KRW-BTC",
  },
  {
    id: 2,
    title: "테스트",
    path: "/test",
  },
  {
    id: 3,
    title: "커뮤니티",
    path: "/community",
  },
];
function Navbar() {
  const [currentUser, setCurrentUser] = useState(undefined);
  console.log(currentUser)

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
    <div className="py-6 mx-4 flex justify-between border-b-2">
      {/* 로고 */}
      <Link href="/">
        <a className=" text-slate-700 text-xl font-mono font-extrabold">
          Cryptocurrency Simulator
        </a>
      </Link>
      {/* 메뉴 */}
      <div className="flex">
        {menu.map((item) => (
          <div key={item.id} className="my-auto mx-10">
            <Link href={item.path}>
              <a>{item.title}</a>
            </Link>
          </div>
        ))}
      </div>
      {currentUser ? (
        <div className="flex">
        <div className="my-auto  mx-10">
        <Link href="/profile">
          <a>프로필</a>
        </Link>
        </div>
        <div className="my-auto mx-10 cursor-pointer mr-24">
        <a onClick={logOut}>로그아웃</a>   
        </div>
        </div>
      ) : (
        <div className="my-auto mr-24">
          <Link href="/login">
            <a>로그인</a>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
