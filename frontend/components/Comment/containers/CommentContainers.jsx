import React, { useContext, useState } from "react";
import { CommentsContext } from "../../../contexts/Comment";
import List from "../components/List";

function CommentContainers({ id }) {
  const content = useContext(CommentsContext);
  const [selectedCommentIndex, setSelectedCommentIndex] = useState([])
  console.log("id", id);

  return (
    <div>
      { content && content.map((item) => (
        <div key={item.id}>
        <List content={item} index={item.id} setSelectedCommentIndex={setSelectedCommentIndex} isSelected={selectedCommentIndex === item.id ? true: false} postId={id} />
        </div>
      ))}
    </div>
  );
}

export default CommentContainers;
