import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import OptionBtn from "../common/OptionBtn";
import axios from "axios";
import { CANDLE } from "../../../pages/config";
import MinuteSelect from "../common/MinuteSelect";
import { chart } from "../common/ChartData";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function Chart({ params, day, month, week }) {
  const [option, setOption] = useState("days");
  const [data, setData] = useState([]);
  const [type, setType] = useState([]);
  const [minute, setMinute] = useState([]); //데이터
  const [minutes, setMinutes] = useState(""); // 옵션

  function handleChange(e) {
    setOption("minutes");
    setMinutes(e.target.value);
  }

  console.log("옵션", option);

  function handleClick(option) {
    setOption(option);
  }

  // 분 데이터 받아오기
  useEffect(() => {
    if (option === "minutes") {
      axios
        .get(`${CANDLE.MINUTES}/${minutes}?market=${params}`)
        .then((response) => {
          setMinute(response.data);
        });
    }
  }, [minutes, option, params]);

  useEffect(() => {
    if (option === "days") {
      setType(day);
    } else if (option === "weeks") {
      setType(week);
    } else if (option === "months") {
      setType(month);
    } else if (option === "minutes") {
      setType(minute);
    }
  }, [day, minute, month, option, week]);

  useEffect(() => {
    const temp = [];
    {
      type &&
        type.map((item) =>
          temp.push({
            x: new Date(item.candle_date_time_kst),
            y: item.prices,
          })
        );
      setData(temp);
    }
  }, [type]);

  console.log("data", data);

  return (
    <div id="chart" className="bg-white">
      <p className="font-bold py-2 px-4">차트</p>
      <div className="font-lg flex border-y py-2 px-2">
        <MinuteSelect value={handleChange} />
        <OptionBtn
          optionType={() => {
            handleClick("days");
          }}
          title="일"
        />
        <OptionBtn
          optionType={() => {
            handleClick("weeks");
          }}
          title="주"
        />
        <OptionBtn
          optionType={() => {
            handleClick("months");
          }}
          title="월"
        />
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

export default Chart;
