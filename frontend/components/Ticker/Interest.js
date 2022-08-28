import axios from "axios";
import React, { useState, useEffect } from "react";
import authHeader from "../../services/auth-header";
import List from "./List";
import LoginForm from "../User/LoginForm";
import Link from "next/link";
import AuthService from "../../services/auth.service";
const url = `http://localhost:9090/v1/api/likes`;

function Interest({ params, setTickerId }) {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get(url, {
        headers: authHeader(),
      })
      .then(
        (response) => {
          setData(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [setData]);

  if (data && currentUser) {
    return <List data={data} params={params} setTickerId={setTickerId} />;
  } else {
    return (
      <div className="bg-white text-center h-64 border">
        <button className="mt-24 border bg-blue-600 w-1/4 h-14 rounded-lg text-white font-bold">
          <Link href="/login">로그인</Link>
        </button>
      </div>
    );
  }
}

export default Interest;
