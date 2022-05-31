import React, {useState, useEffect} from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";

import Ex from "./Ex";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function DayChart({ code }) {
  const [chartData, setChartData] = useState([]);
  let url = `http://localhost:9090/v1/api/candles/days?count=3&market=${code}`;
  const { data, error } = useSWR(url, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  
  return (
    <div>
      <Ex />
    </div>
  );
}

export default DayChart;
