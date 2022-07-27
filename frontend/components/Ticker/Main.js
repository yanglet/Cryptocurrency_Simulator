import React, { useState, useEffect } from "react";
import useSWR from "swr";
import BuySell from "../BuySell";
import CandleChart from "../CandleChart";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import authHeader from "../../services/auth-header";
import Tbody from "./Tbody";
import Thead from "./Thead";
const url = `http://localhost:9090/v1/api/likes/like`;


const fetcher = (...args) => fetch(...args).then((res) => res.json());

// function handleLikes(market){
//   console.log(market)
//   const res = axios.post(url,
//     {
//       market,
//     }, {
//       headers: authHeader()
//     });
//     return res.data;
// };
function Main({ params }) {
  console.log("main:", `${params}`);
  let url = "http://localhost:9090/v1/api/cryptocurrencies";
  const { data, error } = useSWR(url, fetcher, { refreshInterval: 1000 });

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  return (
    <div className="flex">
      <div className="w-2/5 ml-10">
        <table className="table-auto w-full">
          <Thead />
          <Tbody data={data} />
        </table>
      </div>
      {/* <div className="w-3/5 mx-10">
        <div className="border">
          <CandleChart tickerId={tickerId} params={params} />
        </div>
        <div className="border mt-10">
          <BuySell tickerId={tickerId} params={params} />
        </div>
      </div> */}
    </div>
  );
}

export default Main;
