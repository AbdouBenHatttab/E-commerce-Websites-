import axios from "axios"
import AuthService from "@/services/AuthService"

const API_URL = "http://localhost:8080/cart"

class CartService {
  async getCart(userId) {
    const token = AuthService.getToken()
    const user = AuthService.getUser()
    if (!user || !user.id) {
      console.error("CartService.getCart: User ID is missing", user)
      return Promise.reject("User ID is missing")
    }
    return axios.get(`${API_URL}?userId=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async addToCart(productId, quantity) {
    const token = AuthService.getToken()
    const user = AuthService.getUser()
    if (!user || !user.id) {
      console.error("CartService.addToCart: User ID is missing", user)
      return Promise.reject("User ID is missing")
    }
    return axios.post(API_URL, null, {
      params: {
        userId: user.id,
        productId,
        quantity,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async removeFromCart(productId) {
    const token = AuthService.getToken()
    const user = AuthService.getUser()
    if (!user || !user.id) {
      console.error("CartService.removeFromCart: User ID is missing", user)
      return Promise.reject("User ID is missing")
    }
    return axios.delete(`${API_URL}/remove/${productId}`, {
      params: { userId: user.id },
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async updateQuantity(productId, quantity) {
    const token = AuthService.getToken()
    const user = AuthService.getUser()
    if (!user || !user.id) {
      console.error("CartService.updateQuantity: User ID is missing", user)
      return Promise.reject("User ID is missing")
    }
    return axios.put(API_URL, null, {
      params: {
        userId: user.id,
        productId,
        quantity,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
  }
}

export default new CartService()
