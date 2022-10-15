import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LIKE } from "../../../pages/config";
import { LikeContext } from "../../../contexts/Like";
import LikeBtn from "../components/LikeBtn";
import authHeader from "../../../services/auth-header";

function LikeContainer({ market }) {
  const [like, setLike] = useState(false);
  console.log(market)

  const content = useContext(LikeContext);
  console.log("좋아요 content", content);
  console.log("좋아요??", like)

  useEffect(() => {
      {
        content &&
        content.some((object) => {
          if (object.market === `${market}`) {
            setLike(true);
            return true;
          }else if (object.market !== `${market}`) {
            setLike(false);
            return false;
          }
      })
      }
  }, [content, market]);

  const toggleLike = async (e) => {
    {
      like
        ? (await axios
            .delete(`${LIKE.DELETE_LIKE}?market=${market}`, {
              headers: authHeader(),
            })
            .then(() => {
              console.log("좋아요 취소");
              location.reload("")
              setLike(!like);
            })
            .catch((error) => {
              console.log(error)
            })
        )
        : (await axios
            .post(`${LIKE.ADD_LIKE}?market=${market}`, 
            {
              market,
            },
            {
              headers: authHeader(),
            })
            .then(() => {
              console.log("좋아요 추가");
              location.reload("")
              setLike(!like);
            })
            .catch((error) => {
              console.log(error)
            }))

    }
  };

  return <LikeBtn like={like} onClick={toggleLike} />;
}

export default LikeContainer;
