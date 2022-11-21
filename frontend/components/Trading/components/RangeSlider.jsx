import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: -100,
    label: "-100%",
  },
  {
    value: 0,
    label: "0%",
  },
  {
    value: 100,
    label: "100%",
  },
];

function RangeSlider({ setRange, onChangeRange, range, MIN, MAX }) {
  return (
    <div className="w-1/2 h-9 text-right pr-2">
      <Box>
        <Slider
          min={MIN}
          max={MAX}
          getAriaLabel={() => "target profit"}
          value={range}
          onChange={onChangeRange}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </Box>
    </div>
  );
}

export default RangeSlider;
