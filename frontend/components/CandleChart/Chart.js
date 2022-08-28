import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function Ex({ params }) {
  const [option, setOption] = useState("days");
  const [minute, setMinute] = useState("");
  const [url, setUrl] = useState("");

  // console.log("EX", `${params}`)
  function handleClick(option) {
    setOption(option);
  }
  console.log("옵션", option);

  function handleChange(e) {
    setOption("minutes");
    setMinute(e.target.value);
  }

  useEffect(() => {
    if (option === "minutes") {
      setUrl(
        `http://localhost:9090/v1/api/candles/minutes/${minute}?market=${params}`
      );
    }
  }, [minute, params]);

  console.log("url", url);

  useEffect(() => {
    if (option === "days") {
      setUrl(`http://localhost:9090/v1/api/candles/days?market=${params}`);
    } else if (option === "months") {
      setUrl(`http://localhost:9090/v1/api/candles/months?market=${params}`);
    } else if (option === "weeks") {
      setUrl(`http://localhost:9090/v1/api/candles/weeks?market=${params}`);
    }
  }, [option, params]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const temp = [];

    axios
      .get(url)
      .then((response) => {
        response.data.map((item) => {
          temp.push({
            x: new Date(item.candle_date_time_kst),
            y: item.prices,
          });
        });
        setData(temp);
      })
      .catch((e) => {});
  }, [params, url]);

  var chart = {
    options: {
      chart: {
        type: "candlestick",
        height: 350,
      },
      // title: {
      //   text: 'CandleStick Chart',
      //   align: 'left'
      // },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: "rgb(210, 79, 69)",
            downward: "rgb(16, 93, 188)",
          },
        },
      },
    },
  };

  return (
    <div id="chart" className="bg-white">
      <p className="font-bold py-2 px-4">차트</p>
      <div className="font-lg flex border-y py-2 px-2">
        <select onChange={handleChange}>
          <option>분</option>
          <option value="1">1분</option>
          <option value="3">3분</option>
          <option value="5">5분</option>
          <option value="10">10분</option>
          <option value="15">15분</option>
          <option value="30">30분</option>
          <option value="60">60분</option>
        </select>
        <button
          className="mx-2"
          onClick={() => {
            handleClick("days");
          }}
        >
          일
        </button>
        <button
          className="mx-2"
          onClick={() => {
            handleClick("weeks");
          }}
        >
          주
        </button>
        <button
          className="mx-2"
          onClick={() => {
            handleClick("months");
          }}
        >
          월
        </button>
      </div>
      <div className="py-3 px-3">

     
      <ReactApexChart
        options={chart.options}
        series={[{ data: data }]}
        type="candlestick"
        height={350}
      />
       </div>
    </div>
  );
}
export default Ex;
