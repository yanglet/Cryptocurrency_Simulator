import axios from "axios";
import React , {useState, useEffect} from "react";
import useInput from "../hooks/useInput";
import authHeader from "../../services/auth-header";

function CommentForm({params}) {
  const [content, onChangeContent] = useInput("");
  const [user, setUser] = useState([]);

  const url = `http://localhost:9090/v1/api/posts/${params}/comments/comment`;

  const createComments = async (content) => {
    const response = await axios.post(url, 
    {
      content,
    }, {
      headers: authHeader()
    });
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComments(content).then(
        () => {
          window.location.replace(`/community/${params}`);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err){
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex pt-8">
        <div className="w-5/6">
          <label htmlFor="content">
            <input
              className="pl-16 h-24 w-full border-2 border-gray-600 rounded-xl"
              type="text"
              value={content}
              onChange={onChangeContent}
              required
            />
          </label>
        </div>
        <div className="w-1/6 pl-4">
          <button
            type="submit"
            className="w-full h-24 text-xl inline-block rounded-xl bg-gray-200 text-gray-600"
          >
            등록
          </button>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;
