import React from "react";
import List from "../common/List";

function Cryptocurrency({ content, setTickerId, tickerId }) {
  return (
    <div>
      <List
        tickerId={tickerId}
        setTickerId={setTickerId}
        content={content}
        listName={[
          {
            id: 1,
            title: "코인명",
          },
          {
            id: 2,
            title: "현재가",
          },
          {
            id: 3,
            title: "전일대비",
          },
          {
            id: 4,
            title: "거래대금",
          },
        ]}
      />
    </div>
  );
}

export default Cryptocurrency;
