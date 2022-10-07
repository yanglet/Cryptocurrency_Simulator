import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { LikeContext } from "../../../contexts/Like";

function AddLike({ cancelLike,  handleLike, market }) {
  const content = useContext(LikeContext);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    {
      content &&
        content.some((object) => {
          if (object.market === `${market}`) {
            setIsLike(true);
            return true;
          } else if (object.market !== `${market}`) {
            setIsLike(false);
            return false;
          }
        });
    }
  }, [content, market]);

  return (
    <div>
      <button onClick={() => isLike ? setIsLike(false) : setIsLike(true)}>
        { isLike ? <AiFillHeart size="18" color="pink" onClick={cancelLike}/> : <AiOutlineHeart color="pink" size="18" onClick={handleLike}/> }
      </button>
    </div>
  );
}

export default AddLike;
