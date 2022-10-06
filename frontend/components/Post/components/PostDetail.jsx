import React from "react";
import Btn from "./Btn";
import axios from "axios";
import { POST } from "../../../pages/config";
import authHeader from "../../../services/auth-header";
import Router from "next/router";
import Image from "next/image";

function deletePost(id) {
  console.log("id", id);
  axios
    .delete(`${POST.POST_LIST}/${id}`, {
      headers: authHeader(),
    })
    .then(function (response) {
      alert("게시글 삭제");
      Router.push('/community')
    })
    .catch((err) => {
      console.log(err);
    });
}
function PostDetail({ content }) {
  return (
    <div className="max-w-6xl mx-auto pb-4">
      {/* 제목 */}
      <div className="pb-4  border-b-2 ">
        <p className="py-2 text-xl text-gray-600">{content.title}</p>
      </div>
      {/* 글쓴이, 날짜, 조회, 추천 */}
      <div className="text-sm py-4 flex justify-start relative text-gray-500 border-b-2 ">
        <p className="px-4 border-r-2 ">{content.name}</p>
        <p className="px-4 border-r-2 ">{content.createTime}</p>
      </div>
      { content.uploadFiles && content.uploadFiles.map((item, idx) => (
        <Image key={idx} src={`/images/${item.savedFileName}`} width="300" height="300" alt="사진" />
      ))}
      {/* 내용 */}
      <div className=" h-72">
        <p className="px-4 py-24">{content.content}</p>
      </div>
      <div className="flex justify-between text-sm">
        <div className="flex justify-start pt-4 pb-32">
            <Btn
            src={`/community/edit/${content.id}`}
            color="bg-gray-100 rounded-xl px-2 py-2 mr-2"
            value="수정"
          />    
            <button 
            className="bg-gray-100 rounded-xl px-2 py-2 mr-2"
              onClick={() => {
                deletePost(content.id);
              }}
            >
              삭제
            </button>
        </div>
        {/* 목록 이전글 다음글  */}
        <div className="flex justify-end pt-4 pb-32">
          <Btn src="/community" color="bg-gray-100 rounded-xl px-2 py-2 mr-2 cursor-pointer" value="목록" />
        </div>
      </div>
      <div>
       
      </div>
    </div>
  );
}

export default PostDetail;
