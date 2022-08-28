import React from "react";
import Image from "next/image";

const data = [
  {
    id: 1,
    title: "모의투자",
    src: "/images/exchange.png",
    subscribe: "가상으로 원하는 종목에 투자하기",
  },
  {
    id: 2,
    title: "테스트",
    src: "/images/test.png",
    subscribe: "비트코인 투자 테스트",
  },
  {
    id: 3,
    title: "커뮤니티",
    src: "/images/community.png",
    subscribe: "모의 투자 관련 커뮤니티 ",
  },
];
function Introduce(props) {
  return (
    <div className="mb-36">
      <div className="mt-24 text-4xl font-bold">투자에 필요한 모든 기능</div>
      <div className="flex justify-center">
        {data.map((item) => (
          <div className="mt-16" key={item.id}>
            <div className="mx-16">
              <Image src={item.src} width={150} height={150} alt={item.title} />
              <p className="font-bold text-lg">{item.title}</p>
              <p className="mt-2">{item.subscribe}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Introduce;
