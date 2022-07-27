import React, { useState, useEffect } from "react";
import useSWR from "swr";
import List from "./List";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Main({ params }) {
  console.log("main:", `${params}`);
  let url = "http://localhost:9090/v1/api/cryptocurrencies";
  const { data, error } = useSWR(url, fetcher, { refreshInterval: 1000 });

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  return <List data={data} params={params} />;
}

export default Main;
