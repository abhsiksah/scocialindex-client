import axios from "axios";

export const axiosinstance = axios.create({
  baseURL: "https://sahsocial.herokuapp.com/",
});
