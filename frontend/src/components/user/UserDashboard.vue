<template>
  <div class="container py-5">
    <!-- Welcome Header -->
    <div class="text-center mb-5">
      <h1 class="display-5 fw-bold text-primary mb-3">
        Welcome back, {{ user.name || user.email }}! 👋
      </h1>
      <p class="lead text-muted">What would you like to do today?</p>
    </div>

    <!-- Action Cards -->
    <div class="row g-4 justify-content-center">
      <!-- Browse Products Card -->
      <div class="col-md-6 col-lg-4">
        <router-link
          to="/user/products"
          class="card h-100 shadow-lg action-card hover-effect text-decoration-none"
        >
          <div class="card-body text-center p-4">
            <div
              class="icon-wrapper bg-primary-soft rounded-circle p-3 mb-3 mx-auto"
            >
              <i class="bi bi-shop-window fs-1 text-primary"></i>
            </div>
            <h3 class="h4 mb-3">Browse Products</h3>
            <p class="text-muted mb-0">Explore our latest collection</p>
          </div>
        </router-link>
      </div>

      <!-- View Cart Card -->
      <div class="col-md-6 col-lg-4">
        <router-link
          to="/user/cart"
          class="card h-100 shadow-lg action-card hover-effect text-decoration-none"
        >
          <div class="card-body text-center p-4">
            <div
              class="icon-wrapper bg-warning-soft rounded-circle p-3 mb-3 mx-auto"
            >
              <i class="bi bi-cart3 fs-1 text-warning"></i>
            </div>
            <h3 class="h4 mb-3">View Cart</h3>
            <p class="text-muted mb-0">Manage your shopping cart</p>
          </div>
        </router-link>
      </div>

      <!-- Profile Card -->
      <div class="col-md-6 col-lg-4">
        <router-link
          to="/user/profile"
          class="card h-100 shadow-lg action-card hover-effect text-decoration-none"
        >
          <div class="card-body text-center p-4">
            <div
              class="icon-wrapper bg-success-soft rounded-circle p-3 mb-3 mx-auto"
            >
              <i class="bi bi-person-circle fs-1 text-success"></i>
            </div>
            <h3 class="h4 mb-3">My Profile</h3>
            <p class="text-muted mb-0">Update your account details</p>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Quick Stats (Optional) -->
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
}
</script>

<style scoped>
.action-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.075);
  border-radius: 1rem;
}

.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1) !important;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.action-card:hover .icon-wrapper {
  transform: scale(1.1);
}

.bg-primary-soft {
  background-color: rgba(13, 110, 253, 0.1);
}

.bg-warning-soft {
  background-color: rgba(255, 193, 7, 0.1);
}

.bg-success-soft {
  background-color: rgba(25, 135, 84, 0.1);
}

.lead {
  font-size: 1.25rem;
  color: #6c757d;
}

@media (max-width: 768px) {
  .display-5 {
    font-size: 2rem;
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
  }
}
</style>
