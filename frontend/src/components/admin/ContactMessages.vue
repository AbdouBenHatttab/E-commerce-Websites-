<template>
  <div class="contact-messages-container">
    <h2 class="text-center mb-4">Contact Us Messages</h2>

    <!-- No messages available -->
    <div v-if="messages.length === 0" class="alert alert-info">
      No messages available.
    </div>

    <!-- Messages List -->
    <div v-else>
      <div
        v-for="message in messages"
        :key="message.id"
        class="card mb-4 shadow-lg hover-card"
      >
        <div class="card-body">
          <h5 class="card-title font-weight-bold text-dark">
            {{ message.name }}
          </h5>
          <h6 class="card-subtitle mb-3 text-muted">{{ message.email }}</h6>
          <p class="card-text">{{ message.message }}</p>

          <!-- Display formatted timestamp -->
          <div class="timestamp">
            <small class="text-muted"
              >Sent on: {{ formatTimestamp(message.timestamp) }}</small
            >
          </div>

          <div class="d-flex justify-content-end">
            <button
              @click="deleteMessage(message.id)"
              class="btn btn-danger btn-sm shadow-lg delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContactService from "@/services/ContactService"

export default {
  name: "ContactMessages",
  data() {
    return {
      messages: [], // Store the messages fetched from the backend
    }
  },
  async created() {
    await this.fetchMessages()
  },
  methods: {
    async fetchMessages() {
      try {
        this.messages = await ContactService.getAllMessages()
      } catch (error) {
        console.error("Error fetching contact messages:", error)
      }
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    },
    async deleteMessage(id) {
      try {
        await ContactService.deleteMessage(id)
        this.messages = this.messages.filter((message) => message.id !== id)
      } catch (error) {
        console.error("Error deleting message:", error)
      }
    },
  },
}
</script>

<style scoped>
.contact-messages-container {
  padding: 30px 25px;
  background-color: #f4f7fc;
  border-radius: 12px;
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  font-size: 2.2rem;
  font-weight: 700;
}

.card {
  border: none;
  border-radius: 12px;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #6a82fb 0%, #fc5c7d 100%);
  color: white;
  transition: all 0.3s ease-in-out;
}

.card-body {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
}

.card-title {
  font-size: 1.4rem;
  color: #333;
}

.card-subtitle {
  font-size: 1.1rem;
  color: #5a5a5a;
}

.card-text {
  font-size: 1rem;
  color: #555;
}

.timestamp {
  margin-top: 10px;
}

.text-muted {
  font-size: 0.875rem;
  color: #888;
}

.btn-danger {
  font-size: 0.9rem;
  padding: 8px 16px;
  background-color: #f44336;
  border-color: #f44336;
  border-radius: 5px;
  color: white;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
}

.btn-danger:hover {
  background-color: #d32f2f;
  border-color: #c62828;
  box-shadow: 0 4px 12px rgba(211, 47, 47, 0.4);
}

.d-flex {
  display: flex;
}

.justify-content-end {
  justify-content: flex-end;
}

.card.mb-3 {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.card-body:hover {
  background-color: rgba(255, 255, 255, 0.95);
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
}

.card-body {
  transition: all 0.3s ease-in-out;
}

.card-body:hover {
  transform: translateY(-2px);
}
</style>
