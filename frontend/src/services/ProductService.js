import axios from "axios";
import AuthService from "@/services/AuthService"; // Make sure this path is correct

const API_URL = "http://localhost:8080/products";

class ProductService {
  async getAllProducts() {
    return axios.get(API_URL);
  }

  async getProductById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  async createProduct(productData) {
    const token = AuthService.getToken();
    console.log("Creating product with token:", token);
    return axios.post(API_URL, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

 async updateProduct(id, productData) {
  const token = AuthService.getToken()
  return axios.put(`${API_URL}/${id}`, productData, {
    headers: {
      Authorization: `Bearer ${token}`, // Make sure this is correct
      'Content-Type': 'application/json', // Optional but safe
    },
  })
}

  async deleteProduct(id) {
    const token = AuthService.getToken();
    console.log("Deleting product with token:", token);
    return axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getAllCategories() {
    return axios.get(`${API_URL}/categories`);
  }

  async getProductsByCategory(category) {
    return axios.get(`${API_URL}/by-category`, {
      params: { category },
    });
  }
}

export default new ProductService();
