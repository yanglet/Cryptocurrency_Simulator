import React, { useEffect, useState } from "react";
import HoldingList from "../common/HoldingList";
function Holding({ content, setTickerId, tickerId }) {
  const [data, setData] = useState([])
  
  useEffect(() => {
    { content && setData(content.orderItems)}

    
  }, [content])


  return (
    <div>
      <HoldingList
        tickerId={tickerId}
        setTickerId={setTickerId}
        content={data}
        listName={[
          {
            id: 1,
            title: "코인명",
          },
          {
            id: 2,
            title: "보유(평가금)",
          },
          {
            id: 3,
            title: "매수평균가",
          },
          {
            id: 4,
            title: "수익률",
          },
        ]}
      />
    </div>
  );
}

export default Holding;
