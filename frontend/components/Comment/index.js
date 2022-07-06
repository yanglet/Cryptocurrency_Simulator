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

  const deleteComment = (idx) => {
    axios.delete(
        url + `/${idx}`,
        {
          headers: authHeader(),
      })
      .then(res => {
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err);
    })
  };

  const test = data.map((item) => {
    console.log(item.id);
  });

  return (
    <div>
      <p className="text-sm py-4 border-b-2">댓글 {data.length}</p>
      {data &&
        data.map((item, idx) => {
          return (
            <div className="mx-4">
              <p className="text-sm pt-4">{item.name}</p>
              <p className="pb-4">{item.content}</p>
              <div className="text-sm flex justify-end  border-b-2 pb-4">
                <button className="px-4 border-r-2 ">수정</button>
                <button className="px-4" onClick={() => deleteComment()}>삭제</button>
                </div>
            </div>
          );
        })}
    </div>
  );
}

export default Comment;
