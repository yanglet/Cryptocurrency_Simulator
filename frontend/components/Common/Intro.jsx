import Link from "next/link";
import React from "react";
import Introduce from "./Introduce";

function Intro(props) {
  return (
    <div>
      <div className="bg-blue-50">
        <div className="mx-28 py-28 text-center">
          <div className="mb-4 text-4xl font-bold ">
            가상 화폐 모의투자 서비스
          </div>
          <div>코인 정보부터 가상 주문까지</div>
          <Link href="/exchange/KRW-BTC">
            <div className="bg-blue-700 inline-block rounded-full text-white py-4 px-7 mt-11 text-xl text-bold">
              거래소 둘러보기
            </div>
          </Link>
        </div>
      </div>
      <div className="text-center">
        <Introduce />
      </div>
    </div>
  );
}

export default Intro;
