import axios from "axios";

import { axios as axiosLibe } from "../lib/axios.lib";

import { API_URL } from "../lib/axios.lib";

class AuthService {
  async user() {
    const response = await axiosLibe.get(`${API_URL}/auth/user`);
    return response;
  }
  async login(username: string, password: string) {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response;
  }
}

export default new AuthService();
