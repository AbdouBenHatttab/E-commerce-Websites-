<template>
  <div class="container mt-5 fade-in">
    <div class="text-center mb-5">
      <h1 class="display-5 fw-bold text-primary mb-3">
        Welcome back, {{ user.name || user.email }}! 👋
      </h1>
      <p class="lead text-muted">What would you like to do today?</p>
    </div>

    <div class="row g-4">
      <!-- Profile Card -->
      <div class="col-md-3">
        <div
          class="card profile-card h-100 p-5 text-center text-white"
          @click="goToProfile"
        >
          <div class="icon-container mb-4">
            <span class="display-2">👤</span>
          </div>
          <h3 class="mb-3">Admin Profile</h3>
          <p class="mb-0 opacity-90">
            View and update your profile information
          </p>
        </div>
      </div>

      <!-- Users Card -->
      <div class="col-md-3">
        <div
          class="card users-card h-100 p-5 text-center text-white"
          @click="goToUsers"
        >
          <div class="icon-container mb-4">
            <span class="display-2">👥</span>
          </div>
          <h3 class="mb-3">Manage Users</h3>
          <p class="mb-0 opacity-90">Manage system users and permissions</p>
        </div>
      </div>

      <!-- Products Card -->
      <div class="col-md-3">
        <div
          class="card products-card h-100 p-5 text-center text-white"
          @click="goToProducts"
        >
          <div class="icon-container mb-4">
            <span class="display-2">📦</span>
          </div>
          <h3 class="mb-3">Manage Products</h3>
          <p class="mb-0 opacity-90">Handle product inventory and listings</p>
        </div>
      </div>

      <!-- Messages Card -->
      <div class="col-md-3">
        <div
          class="card messages-card h-100 p-5 text-center text-white"
          @click="goToMessages"
        >
          <div class="icon-container mb-4">
            <span class="display-2">✉️</span>
          </div>
          <h3 class="mb-3">Messages</h3>
          <p class="mb-0 opacity-90">View and manage user messages</p>
        </div>
      </div>
    </div>
    <div class="row g-4 mt-4">
      <div class="col-12">
        <div class="card shadow-sm border-0">
          <div class="card-body text-center py-3">
            <span class="text-muted">Currently browsing as:</span>
            <span class="badge bg-primary bg-opacity-25 text-primary ms-2">
              {{ user.role || "standard user" }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService"

export default {
  data() {
    return {
      user: AuthService.getUser() || {},
    }
  },
  methods: {
    goToProfile() {
      this.$router.push({ name: "AdminProfile" })
    },
    goToUsers() {
      this.$router.push({ name: "AdminUsers" })
    },
    goToProducts() {
      this.$router.push({ name: "AdminProducts" })
    },
    goToMessages() {
      this.$router.push({ name: "Messages" })
    },
  },
}
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  border: none;
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.card:hover::after {
  opacity: 1;
}

/* Gradient Backgrounds */
.profile-card {
  background: linear-gradient(135deg, #667eea 0%, #805ad5 100%);
}

.users-card {
  background: linear-gradient(135deg, #4bc0c8 0%, #c779d0 100%);
}

.products-card {
  background: linear-gradient(135deg, #f6ad55 0%, #f6e05e 100%);
}

.messages-card {
  background: linear-gradient(135deg, #63b3ed 0%, #4299e1 100%);
}

.icon-container {
  transition: transform 0.3s ease;
}

.card:hover .icon-container {
  transform: scale(1.1);
}

.opacity-90 {
  opacity: 0.9;
}

.display-4 {
  letter-spacing: -0.05rem;
}

h3 {
  font-weight: 600;
  letter-spacing: -0.03rem;
  margin-bottom: 1.5rem;
}

p {
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .col-md-3 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media (max-width: 576px) {
  .col-md-3 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
