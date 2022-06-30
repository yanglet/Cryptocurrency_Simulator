import axios from "axios";
const API_URL = "http://localhost:9090/v1/api/auth/";

const register = (balance, email, name, password) => {
  return axios.post(API_URL + "signup" , {
    balance,
    email,
    name,
    password,
  })
} 

const login = async (email, password) => {
  const response = await axios.post(API_URL + "login", {
    email,
    password,
  });
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logOut = () => {
  localStorage.removeItem("user");
  window.location.replace('/');
  console.log("로그아웃")
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};


const AuthService = {
  register,
  login,
  logOut,
  getCurrentUser,
};

export default AuthService;
