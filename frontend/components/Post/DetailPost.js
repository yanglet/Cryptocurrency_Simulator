import axios from "axios";
import React, { useState, useEffect } from "react";
import authHeader from "../../services/auth-header";
import UserService from "../../services/user.service";
import CommentForm from "../Comment/CommentForm";
import Link from "next/link";
import Comment from "../Comment";
function DetailPost({ params }) {
  const [content, setContent] = useState([]);

  const url = `http://localhost:9090/v1/api/posts/${params}`;

  useEffect(() => {
    axios
      .get(url, {
        headers: authHeader(),
      })
      .then((response) => {
        setContent(response.data);
      }),
      (error) => {
        console.log(error);
      };
  }, []);

  const deletePost = () => {
    axios.delete(
        url, {
          headers: authHeader(),
      })
      .then(res => {
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err);
    })
  };

  return (
    <div className="max-w-6xl mx-auto py-4">
      {/* 제목 */}
      <div className="py-4 px-4 border-b-2 ">
        <p className="py-2 text-4xl text-gray-600">{content.title}</p>
      </div>
      {/* 글쓴이, 날짜, 조회, 추천 */}
      <div className="text-sm py-4 flex justify-start relative text-gray-500 border-b-2 ">
        <p className="px-4 border-r-2 ">{content.name}</p>
        <p className="px-4 border-r-2 ">{content.email}</p>
      </div>
      {/* 내용 */}
      <div className=" h-72">
        <p className="px-4 py-4">{content.content}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex justify-start pt-4 pb-32">
          <Link href={`/editPost/${params}`}>
            <button className="bg-gray-100 rounded-xl px-2 py-2 mr-2">
              수정
            </button>
          </Link>
          <Link href="/community">

          
          <button
            className="bg-gray-100 rounded-xl py-2 px-2"
            onClick={deletePost}
          >
            삭제
          </button>
          </Link>
        </div>

        {/* 목록 이전글 다음글  */}
        <div className="flex justify-end pt-4 pb-32">
          <Link href="/community">
            <p className="bg-gray-100 rounded-xl px-2 py-2 mr-2 cursor-pointer">목록</p>
          </Link>
 
          <button className="bg-gray-100 rounded-xl px-2 mr-2">이전글</button>
          <button className="bg-gray-100 rounded-xl px-2 ">다음글</button>
        </div>
      </div>
      {/* 댓글부분 - 댓글 개수 추가  */}
      <div>
        <Comment params={params} />
        <CommentForm params={params} />
      </div>
    </div>
  );
}

export default DetailPost;
