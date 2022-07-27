import axios from "axios";
import React, { useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import authHeader from "../../services/auth-header";

function Likes({ market }) {
  console.log("market", market);

  function handleLike() {
    const response = axios.post(
      `http://localhost:9090/v1/api/likes/like?market=${market}`,
      {
        market,
      },
      {
        headers: authHeader(),
      }
    );
    return response.data;
  }

  return (
      <button onClick={handleLike}>
        <AiOutlineHeart size="21" />
      </button>
   
  );
}

export default Likes;
