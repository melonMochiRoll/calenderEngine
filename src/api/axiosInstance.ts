import axios from "axios";

const DEVELOPMENT_BASEURL = 'http://localhost:3000';

export const axiosInstance = axios.create({
  baseURL: DEVELOPMENT_BASEURL,
  headers: { "Content-Type" : "application/json" },
  withCredentials: true,
});