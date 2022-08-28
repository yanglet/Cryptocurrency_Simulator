import React, { useState, useEffect } from "react";
import PostService from "../../services/post.service";
import useInput from "../hooks/useInput";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import { useRouter } from "next/router";

function CreatePost(props) {
  const router = useRouter();
  const [content, onChangeContent] = useInput("");
  const [title, onChangeTitle] = useInput("");
  const [user, setUser] = useState([]);

  // if( typeof window !== 'undefined'){
  //   const Authorization = Object.values(JSON.parse(localStorage.getItem("user")));
  //   console.log(Authorization);
  // }

  useEffect(() => {
    UserService.getMemberDetail().then(
      (response) => {
        setUser(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PostService.createPosts(content, title).then(
        () => {
          window.location.replace("/community");
        },
        (error) => {
          console.log(error);
          // 토큰이 유효하지않은 경우
          // if(error.response && error.response.status === 403){
          //   AuthService.logOut();
          //   window.location.replace("");
          // }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border-slate-800">
        <div className="font-bold text-lg border-b-2 pb-4 border-slate-200">
          게시글 쓰기
        </div>
      <form
        onSubmit={handleSubmit}
        className="text-lg "
      >
        <div className="flex border-b-2 py-6">
          <label className="mr-8">작성자</label>
          <p>{user.name}</p>
        </div>

        <div className="flex border-b-2 py-6">
          <label className="mr-8 text-lg my-auto">제목</label>
          <input
            className="border-2 rounded-md w-96 h-11 text-lg"
            value={title}
            onChange={onChangeTitle}
            type="text"
            required
          />
        </div>
        <div className="w-full py-11">
          <input
            className="px-11 w-full h-72 border text-lg"
            type="text"
            placeholder="커뮤니티 글쓰기"
            value={content}
            onChange={onChangeContent}
            required
          />
        </div>
        <div className="flex justify-end">
          {/* router이용하여 뒤로가기  */}
          <button
            onClick={() => router.back()}
            className="bg-red-100 rounded-xl py-2 mr-2 w-36 font-bold  h-14"
            type="submit"
          >
            취소
          </button>
          <button
            className="bg-blue-100 rounded-xl py-2 mr-2 w-36 font-bold h-14"
            type="submit"
          >
            확인
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
