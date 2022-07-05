import axios from "axios";
import React, { useState, useEffect } from "react";
import authHeader from "../../services/auth-header";

function Comment({ params }) {
  const [data, setData] = useState([]);

  const url = `http://localhost:9090/v1/api/posts/${params}/comments`;

  useEffect(() => {
    axios
      .get(url, {
        headers: authHeader(),
      })
      .then((response) => {
        setData(response.data);
      }),
      (error) => {
        console.log(error);
      };
  }, []);

  const test = data.map((item) => {
    console.log(item.content);
  })


  return (
    <div>
      <p className="text-sm py-4 border-b-2">댓글 {data.length}</p>
      { data && data.map((item, idx) => 
      { 
        return(
            <div className="">
        <p className="text-sm pt-4">{item.member.name}</p> 

          <p className="pb-8 border-b-2">{item.content}</p> 
        </div>
        )
        
      }
      ) }
    </div>
  );
}

export default Comment;
