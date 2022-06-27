import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    }
  ];
function Sidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="h-screen px-6 py-6 border-r-2">
        <Link href="/" className="">
          <a className='text-2xl text-slate-200'>Cryptocurrency<br/>Simulator</a>
        </Link>
        <ul className="py-6">
          {menu &&
            menu.map((item) => {
              return (
                <div key={item.id} className="mx-4 my-9">
                  <Link href={item.path}>
                    <a className="text-slate-200 text-xl">{item.title}</a>
                  </Link>
                </div>
              );
            })}
              {isLoggedIn ? 
              <div className="mx-4 my-9">
                <Link href="/profile">
                <a className="text-slate-200 text-xl">프로필</a>
                </Link> 
              </div>
              : 
              <div className="mx-4 my-9">
                <Link href="/login">
                <a className="text-slate-200 text-xl">로그인</a>
                </Link>
              </div>
          }
        </ul>
      </div>
      

    );
}

export default Sidebar;