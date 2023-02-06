import axios, { AxiosInstance } from "axios";

export const baseURL = "http://localhost:4200/api";
const instance: AxiosInstance = axios.create({ baseURL });

export const setAuth = () => {
  const user =
    (window.localStorage?.user && window.localStorage?.user === "undefined"
      ? `{}`
      : window.localStorage?.user) || `{}`;
  const token = JSON.parse(user)?.token || "";
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

setAuth();

export default instance;
