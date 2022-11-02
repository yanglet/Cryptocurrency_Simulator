import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { CryptocurrencyProvider } from "../../contexts/Cryptocurrency/index";
import CryptocurrenciesContainer from "../../components/cryptocurrency/containers/CryptocurrenciesContainer";
import CategoryType from "../../components/cryptocurrency/components/CategoryType";
import InformationContainer from "../../components/CandleChart/containers/InformationContainer";
import { CandleProvider } from "../../contexts/CandleChart";
import CandleChartContainer from "../../components/CandleChart/containers/CandleChartContainer";
import { LikeProvider } from "../../contexts/Like";
import InterestContainer from "../../components/cryptocurrency/containers/InterestContainer";
import { BalanceProvider } from "../../contexts/Balance";
import HoldingContainer from "../../components/cryptocurrency/containers/HoldingContainer";
import { PriceProvider } from "../../contexts/Price/index"
import TradingContainer from "../../components/Trading/containers/TradingContainer"

function Exchange(props) {
  const [categoryName, setCategoryName] = useState("main");
  const router = useRouter();
  const [tickerId, setTickerId] = useState("1");

  console.log(categoryName);
  console.log(tickerId);

  const { params } = router.query;
  console.log("params", params);

  return (
    <div className="xl:px-4">
      <div className="">
        <Head>
          <title>모의 투자 사이트 | 거래소</title>
        </Head>
        <div className="flex w-full">
          {/* 카테고리 선택*/}
          <div className="w-2/6">
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
            {categoryName === "holding" && (
              <BalanceProvider>
                <HoldingContainer
                  tickerId={tickerId}
                  setTickerId={setTickerId}
                  params={params}
                />
              </BalanceProvider>
            )}
          </div>
        
          <div className="w-4/6 border ml-2">
            {/* 비트코인 기본 정보 */}
            <CryptocurrencyProvider>
              <InformationContainer
                params={params}
                tickerId={tickerId}
                setTickerId={setTickerId}
              />
            </CryptocurrencyProvider>
            {/* 캔들차트 */}
            <CandleProvider params={params}>
              <CandleChartContainer
                params={params}
                tickerId={tickerId}
                setTickerId={setTickerId}
              />
            </CandleProvider>
            {/* 거래 관련  */}
            <PriceProvider>
              <TradingContainer tickerId={tickerId} />
            </PriceProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exchange;
