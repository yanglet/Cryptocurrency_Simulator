import React , {useState, useEffect} from "react";
import { useRouter } from "next/router";
import PostService from "../../services/post.service";
import useInput from "../hooks/useInput";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

function CreatePost(props) {
  const [content, onChangeContent] = useInput("");
  const [title, onChangeTitle] = useInput("");
  const [user, setUser] = useState([]);

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
      await PostService.createPosts(user, content, title).then(
        () => {
          window.location.replace("/community");
        },
        (error) => {
          console.log(error);
          // 토큰이 유효하지않은 경우 
          if(error.response && error.response.status === 403){
            AuthService.logOut();
            window.location.replace("");
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border-slate-800 text-center">
      <form
        onSubmit={handleSubmit}
        className="inline-block border-t-2 border-slate-800"
      >
         <div className="flex border-b-2 py-6">
          <label className="mr-8">작성자</label>
          <p>{user.name}</p>
          {/* <input
            className="border-2 rounded-md w-96"
            value={content.name}
            onChange={onChangeTitle}
            type="text"
            required
          /> */}
        </div>
        <div className="flex border-b-2 py-6">
          <label className="mr-8">제목</label>
          <input
            className="border-2 rounded-md w-96"
            value={title}
            onChange={onChangeTitle}
            type="text"
            required
          />
        </div>
        <div className="w-full py-11">
          <input
            className="px-11 w-full h-72 border"
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
            onClick={() => Router.back()}
            className="bg-slate-100 rounded-xl px-2 py-2 mr-2 w-24"
            type="submit"
          >
            취소
          </button>
          <button
            className="bg-slate-400 rounded-xl px-2 py-2 mr-2 w-24"
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
