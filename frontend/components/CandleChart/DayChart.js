import React, {useState, useEffect} from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";

import Ex from "./Ex";

function DayChart({ code }) {

  return (
    <div>
      <Ex code={code} />
    </div>
  );
}

export default DayChart;
