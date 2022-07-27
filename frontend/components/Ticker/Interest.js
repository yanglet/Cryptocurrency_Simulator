import axios from "axios";
import React, { useState, useEffect } from "react";
import authHeader from "../../services/auth-header";
import List from "./List";
import LoginForm from "../User/LoginForm";
import Link from "next/link";

const url = `http://localhost:9090/v1/api/likes`;

function Interest({ params }) {
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

  if (data) {
    return <List data={data} params={params} />;
  } else {
    return <LoginForm />;
  }
}

export default Interest;
