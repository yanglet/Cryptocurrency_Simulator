import React from "react";
import { COMMENT } from "../../../pages/config";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import EditForm from "./EditForm";

function List({ index, postId, content, setSelectedCommentIndex, isSelected }) {
  function onSelectedCommentIndex() {
    setSelectedCommentIndex(index);
  }

  function deleteComment(id) {
    console.log("id", id);
    axios
      .delete(`${COMMENT.COMMENT_LIST}/${postId}/comments/${id}`, {
        headers: authHeader(),
      })
      .then(function (response) {
        alert("댓글 삭제");
        location.reload("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      {isSelected ? <EditForm postId={postId} commentId={index} data={content.content} /> : 
      <div className="">
      <p className="text-xs pt-4">{content.name}</p>
      <p className="py-4 text-sm ">{content.content}</p>
      <div className="text-xs flex justify-end  border-b-2 pb-4">
        <button className="px-4 border-r-2" onClick={onSelectedCommentIndex}>
          수정
        </button>
        <button
          className="px-4"
          onClick={() => {
            deleteComment(content.id);
          }}
        >
          삭제
        </button>
      </div>
          </div>
      }
 
    </div>
  );
}

export default List;
