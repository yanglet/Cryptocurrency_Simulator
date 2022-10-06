import { useRouter } from "next/router";
import React, { useEffect, useRef, useState, useCallback } from "react";
import useInput from "../../../hooks/useInput";
import { BsPlusSquare } from "react-icons/bs";
import axios from "axios";
import authHeader from "../../../services/auth-header";

function PostEdit({ value }) {
  const router = useRouter();
  const ImgInput = useRef();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    setContent(value.content);
    setTitle(value.title);
  }, [value.content, value.title]);

  const onChangeContent = useCallback((e) => {
    setContent(e.target.value);
  }, []);

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const multipartFiles = e.target.multipartFiles.files; //form의 input을 갖고옴
    const formData = new FormData();
    for (const i = 0; i < multipartFiles.length; i++) {
      formData.append("requestFiles", multipartFiles[i]);
    }
    const requestData = {
      content,
      title,
    };

    const json = JSON.stringify(requestData);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("requestData", blob);
    for (const value of formData.values()) {
      console.log(value);
    }
    const res = await axios({
      method: "POST",
      url: `http://localhost:9090/v1/api/posts/${value.id}`,
      mode: "cors",
      headers: authHeader(),
      data: formData,
    }).then(() => {
      router.push("/community");
      alert("게시글 수정 완료!");
    });
    console.log(res);
  };
  return (
    <form
      className="my-6 text-sm"
      encType="multipart/form-data"
      onSubmit={onSubmit}
    >
      <div className="flex pb-7 border-b">
        <p className="text-gray-600 my-auto">제목</p>
        <input
          required
          value={title}
          onChange={onChangeTitle}
          className="text-gray-3 border outline-none px-3 ml-24 w-3/4 py-1 rounded-lg"
          placeholder="제목을 입력하세요. "
        />
      </div>
      <div className="flex py-9 border-b">
        <p className="text-gray-600 my-auto">사진 첨부</p>
        <input
          ref={ImgInput}
          type="file"
          id="Img"
          accept="image/*"
          name="multipartFiles"
          multiple
          hidden
        />
        <button
          className=" mx-3 ml-16"
          onClick={(e) => ImgInput.current && ImgInput.current.click()}
        >
          <BsPlusSquare size="25" />{" "}
        </button>
      </div>
      <div className="py-7">
        <input
          required
          value={content}
          onChange={onChangeContent}
          className="text-gray-3 w-full border h-96 px-4 outline-none rounded-lg"
          placeholder="자유롭게 글을 작성해보세요 : ) "
        />
      </div>
      <div className="flex justify-end">
        {/* router이용하여 뒤로가기  */}
        <button
          onClick={() => router.back()}
          className="bg-gray-100 rounded-lg py-1 px-2 mr-2 text-sm"
          type="submit"
        >
          취소
        </button>
        <button
          className="bg-blue-500 text-white rounded-lg py-1 px-2 mr-2 text-sm"
          type="submit"
        >
          확인
        </button>
      </div>
    </form>
  );
}

export default PostEdit;
