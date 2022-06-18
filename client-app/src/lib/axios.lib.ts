import axios from "axios";

const API_URL = "http://localhost:3000";

const headers: any = axios.defaults.headers;

headers.common["Access-Control-Allow-Origin"] = "*";
headers.common["Content-Type"] = "application/json, text/plain, */*";

const instance = axios.create({
  baseURL: API_URL,
  headers: headers,
});

instance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = "Bearer " + token;
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status == 401) {
      localStorage.removeItem("token");
      //   router.replace("/login");
    }

    return Promise.reject(error);
  }
);

export { instance as axios, API_URL };
