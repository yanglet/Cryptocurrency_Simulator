import React from "react";

function OptionBtn({ optionType, title }) {
  return (
    <button className="mx-2" onClick={optionType}>
      {title}
    </button>
  );
}

export default OptionBtn;
