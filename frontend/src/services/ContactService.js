import axios from "axios"
import AuthService from "@/services/AuthService" // Adjust the path as needed

// Set the base URL for contact messages (you can also use environment variables)
const API_URL =
  process.env.VUE_APP_CONTACT_API_URL ||
  "http://localhost:8080/contact/messages"

class ContactService {
  // Get all messages
  async getAllMessages() {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${AuthService.getToken()}` },
      })
      return response.data
    } catch (error) {
      console.error("Error fetching messages:", error)
      throw error
    }
  }

  // Get a single message by ID
  async getMessageById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${AuthService.getToken()}` },
      })
      return response.data
    } catch (error) {
      console.error(`Error fetching message with ID ${id}:`, error)
      throw error
    }
  }

  // Create a new message
  async createMessage(message) {
    try {
      const response = await axios.post(API_URL, message, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthService.getToken()}`,
        },
      })
      return response.data
    } catch (error) {
      console.error("Error creating message:", error)
      throw error
    }
  }

  // Update an existing message
  async updateMessage(id, updatedMessage) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedMessage, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthService.getToken()}`,
        },
      })
      return response.data
    } catch (error) {
      console.error(`Error updating message with ID ${id}:`, error)
      throw error
    }
  }

  // Delete a message
  async deleteMessage(id) {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${AuthService.getToken()}` },
      })
      return { success: true }
    } catch (error) {
      console.error(`Error deleting message with ID ${id}:`, error)
      throw error
    }
  }
}

export default new ContactService()
