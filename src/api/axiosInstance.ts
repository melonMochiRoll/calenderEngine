import axios from "axios";

const BACKURL = process.env.REACT_APP_SERVER_ORIGIN;

export const axiosInstance = axios.create({
  baseURL: BACKURL,
  headers: { "Content-Type" : "application/json" },
  withCredentials: true,
});