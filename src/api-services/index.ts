import axios, {AxiosInstance} from "axios";

export const baseURL = `${process.env.REACT_APP_BASE_URL}/api`;
const instance: AxiosInstance = axios.create({baseURL});

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
