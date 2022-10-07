import React, { useCallback, useContext } from "react";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import { LIKE } from "../../../pages/config";
import { LikeProvider } from "../../../contexts/Like/";
import AddLike from "../components/AddLike";

function AddLikeContainers({ market }) {
  const handleLike = useCallback(() => {
    const res = axios
      .post(
        `${LIKE.LIKE_LIST}/like?market=${market}`,
        {
          market,
        },
        {
          headers: authHeader(),
        }
      )
      .then(() => {
      });
    
    return res.data;
  }, [market]);

  const cancelLike = useCallback(() => {
   axios
      .delete(`${LIKE.LIKE_LIST}/like?market=${market}`, {
        headers: authHeader(),
      })
      .then(() => {
      });
   
  }, [market]);

  return (
    <div>
      <LikeProvider>
        <AddLike
          handleLike={handleLike}
          market={market}
          cancelLike={cancelLike}
        />
      </LikeProvider>
    </div>
  );
}

export default AddLikeContainers;
