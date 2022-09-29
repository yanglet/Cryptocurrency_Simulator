import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { CryptocurrencyProvider } from "../../contexts/Cryptocurrency/index";
import CryptocurrenciesContainer from "../../components/cryptocurrency/containers/CryptocurrenciesContainer";
import CategoryType from "../../components/cryptocurrency/components/CategoryType";
import InformationContainer from "../../components/CandleChart/containers/InformationContainer";
import { CandleProvider } from "../../contexts/CandleChart";
import CandleChartContainer from "../../components/CandleChart/containers/CandleChartContainer";
import TradingContainer from "../../components/Trading/containers/TradingContainer";
import { LikeProvider } from "../../contexts/Like";
import InterestContainer from "../../components/cryptocurrency/containers/InterestContainer"
function Exchange(props) {
  const [categoryName, setCategoryName] = useState("main");
  const router = useRouter();
  const [tickerId, setTickerId] = useState("1");

  console.log(categoryName);
  console.log(tickerId);

  const { params = [] } = router.query;
  console.log("params", params);

  return (
    <div className="bg-gray-100 py-11">
      <div className="2xl:mx-auto max-w-screen-2xl sm:mx-24">
        <Head>
          <title>모의 투자 사이트 | 거래소</title>
        </Head>
        <div className="grid 2xl:grid-cols-4 sm:grid-cols-3">
          {/* 카테고리 선택*/}
          <div className="2xl:col-span-2 sm:mr-8">
            <CategoryType
              categoryName={categoryName}
              setCategoryName={setCategoryName}
            />
             {categoryName === "main" && (
              <CryptocurrencyProvider>
                <CryptocurrenciesContainer
                  tickerId={tickerId}
                  setTickerId={setTickerId}
                  params={params}
                />
              </CryptocurrencyProvider>
            )}
            {categoryName === "interest" && (
              <LikeProvider>
                <InterestContainer
                  tickerId={tickerId}
                  setTickerId={setTickerId}
                  params={params}
                />
            </LikeProvider>
            )}
          </div>
          <div className="col-span-2">
          <CryptocurrencyProvider>
            <InformationContainer params={params} tickerId={tickerId} setTickerId={setTickerId} />
          </CryptocurrencyProvider>
          <CandleProvider params={params}>
            <CandleChartContainer params={params} tickerId={tickerId} setTickerId={setTickerId} />
          </CandleProvider>
          <CryptocurrencyProvider>
            <TradingContainer tickerId={tickerId} />
          </CryptocurrencyProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exchange;
