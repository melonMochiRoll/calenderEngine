import axios from "axios";

const isDevelopment = process.env.REACT_APP_NODE_ENV === 'development';
const origin = isDevelopment ? process.env.REACT_APP_DEVELOPMENT_SERVER_ORIGIN : process.env.REACT_APP_PRODUCTION_SERVER_ORIGIN;

export const axiosInstance = axios.create({
  baseURL: origin,
  headers: { "Content-Type" : "application/json" },
  withCredentials: true,
});