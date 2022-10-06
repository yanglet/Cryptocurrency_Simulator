import axios from "axios";
import React from "react";
import useInput from "../../../hooks/useInput";
import { URL } from "../../../pages/config";
import authHeader from "../../../services/auth-header";

function CommentForm({ id }) {
  const [content, onChangeContent] = useInput("");

  const handleSubmit = async () => {
    const res = await axios
      .post(
        `${URL}/posts/${id}/comments/comment`,
        {
          content,
        },
        {
          headers: authHeader(),
        }
      )
      .then(() => {
        alert("댓글 작성 완료");
      });

    console.log(res);
  };
  return (
    <form onSubmit={handleSubmit} className="mb-11">
      <div className="flex pt-8">
        <div className="w-5/6">
          <label htmlFor="content">
            <input
              className="outline-none pl-16 h-20 w-full border border-gray-300 rounded-xl"
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
            className="w-full h-20 inline-block rounded-xl bg-blue-500 text-white"
          >
            등록
          </button>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;
