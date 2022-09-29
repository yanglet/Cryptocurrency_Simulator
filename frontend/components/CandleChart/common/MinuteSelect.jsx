import React from "react";

function MinuteSelect({ value }) {
  return (
    <select onChange={value}>
        <option>분</option>
        <option value="1">1분</option>
        <option value="3">3분</option>
        <option value="5">5분</option>
        <option value="10">10분</option>
        <option value="15">15분</option>
        <option value="30">30분</option>
        <option value="60">60분</option>
  </select>
  )
}

export default MinuteSelect;
