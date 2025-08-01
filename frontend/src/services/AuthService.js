// src/services/AuthService.js
import axios from "axios";

const API_URL = "http://localhost:8080/auth";

class AuthService {
  async login(credentials) {
    // 🧹 Clear old Authorization header (to prevent sending wrong token)
    delete axios.defaults.headers.common["Authorization"];

    const response = await axios.post(`${API_URL}/login`, credentials, {
      headers: { "Content-Type": "application/json" },
    });

    const user = response.data.user;
    const token = response.data.token;

    // ✅ Save token and user in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    // ✅ Set token for future requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return response.data;
  }

  async register(userData) {
    return axios.post(`${API_URL}/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // 🧹 Remove token from Axios headers
    delete axios.defaults.headers.common["Authorization"];
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getCurrentUser() {
    return this.getUser();
  }

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  setAuthHeaderFromLocalStorage() {
    const token = this.getToken();
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }
}

// When app starts, set token if exists
const authService = new AuthService();
authService.setAuthHeaderFromLocalStorage();

export default authService;
