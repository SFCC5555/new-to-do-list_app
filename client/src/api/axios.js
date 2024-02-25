import axios from "axios";

const instance = axios.create({
  baseURL: "sfcc/api/v1",
  //withCredentials: true,
});

export default instance;
