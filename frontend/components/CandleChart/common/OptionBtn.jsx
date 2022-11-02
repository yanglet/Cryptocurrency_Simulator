import React from "react";

function OptionBtn({ optionType, title }) {
  return (
    <button className="mx-2 font-semibold" onClick={optionType}>
      {title}
    </button>
  );
}

export default OptionBtn;
