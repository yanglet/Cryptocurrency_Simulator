import React, { useState, useEffect } from "react";
import PostService from "../../services/post.service";
import Link from "next/link";
import authHeader from "../../services/auth-header";

function Post(props) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    PostService.getAllPosts().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="">
      <table className="border-t-2 border-slate-300">
        <thead className="">
          <tr className="bg-gray-50">
            <th className="py-3">번호</th>
            <th className="w-3/5  ">제목</th>
            <th className="w-1/5  ">글쓴이</th>
            <th className="w-1/5">등록일</th>
          </tr>
        </thead>
        <tbody>
          {content.map((item) => (
            // 각 게시글 클릭시 이동
            <Link href={`/community/${item.id}`} key={item.id}>
              <tr className="border-b-2 cursor-pointer">
                <td className="py-2 text-center px-5">{item.id}</td>
                <td className="px-5">{item.title}</td>
                <td className="text-center px-5 w-44">{item.name}</td>
                <td className="text-center px-5">{item.createTime}</td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Post;
