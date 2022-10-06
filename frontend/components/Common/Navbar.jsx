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
    title: "투자내역",
    path: "/investments/balance",
  },
  {
    id:4,
    title:"커뮤니티",
    path: "/community",
  }, 
  {
    id:5,
    title:"랭킹",
    path: "/ranking",
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
    <div className="max-w-7xl  py-6 mx-auto">
    <div className="flex justify-between">
      {/* 로고 */}
      <Link href="/">
        <a className="my-auto text-slate-700 text-xl font-mono font-extrabold">
          Cryptocurrency Simulator
        </a>
      </Link>
      {/* 메뉴 */}
      <div className="flex">
        {menu.map((item) => (
          <div key={item.id} className="my-auto mx-10 font-semibold">
            <Link href={item.path}>
              <a>{item.title}</a>
            </Link>
          </div>
        ))}
      </div>
      {currentUser ? (
        <div className="flex">
        <div className="my-auto mr-4 rounded-full border-2 py-2 px-8 border-blue-400 text-blue-400 font-semibold hover:bg-gray-300">
        <Link href="/member/profile">
          프로필
        </Link>
        </div>
        <div className="my-auto rounded-full py-2 border-2 border-blue-400 px-8 bg-blue-500 text-white font-semibold hover:bg-gray-300">
        <button onClick={logOut}>로그아웃</button>   
        </div>
        </div>
      ) : (
        <div className="flex">
        <div className="my-auto mr-4 rounded-full border-2 py-2 px-8 border-blue-400 text-blue-400 font-semibold hover:bg-gray-300">
          <Link href="/member/login">
            로그인
          </Link>
        </div>
         <div className="my-auto rounded-full py-2 border-2 border-blue-400 px-8 bg-blue-500 text-white font-semibold hover:bg-gray-300">
         <Link href="/member/signup">
           회원가입
         </Link>
       </div>
       </div>
      )}
    </div>
    </div>
  );
}

export default Navbar;
