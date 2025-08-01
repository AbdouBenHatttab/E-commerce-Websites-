import axios from "axios"
import AuthService from "@/services/AuthService"

const API_URL = "http://localhost:8080/users"

class UserService {
  getAuthHeaders() {
    const token = AuthService.getToken()
    if (!token) {
      console.error("No auth token found. User might be logged out.")
      return {}
    }
    return { Authorization: `Bearer ${token}` }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"))
  }

  async getAllUsers() {
    return axios.get(API_URL, { headers: this.getAuthHeaders() })
  }

  async updateUser(id, userData) {
    console.log(`Updating user ${id} with data:`, userData)
    return axios.put(`${API_URL}/${id}`, userData, {
      headers: this.getAuthHeaders(),
    })
  }

  async updateProfile(profile) {
    const token = AuthService.getToken()
    return axios.put(`${API_URL}/profile`, profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  async deleteUser(id) {
    console.log(`Deleting user ${id}`)
    return axios.delete(`${API_URL}/${id}`, { headers: this.getAuthHeaders() })
  }
}

export default new UserService()
