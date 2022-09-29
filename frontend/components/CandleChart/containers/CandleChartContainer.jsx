import React, { useContext } from "react";
import { CandleContext } from "../../../contexts/CandleChart";
import Chart from "../components/Chart";

function CandleChartContainer({ params }) {
  const { day } = useContext(CandleContext);
  const { month } = useContext(CandleContext);
  const { week } = useContext(CandleContext);

  return (
    <div>
      <Chart params={params} day={day} month={month} week={week} />
    </div>
  );
}

export default CandleChartContainer;
