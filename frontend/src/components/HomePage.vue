<template>
  <div class="home-container">
    <!-- Hero Section -->
    <div class="home-hero bg-primary-gradient text-white text-center py-5">
      <div class="container">
        <h1 class="display-4 fw-bold">Welcome to Our Shop</h1>
        <p class="lead mt-3">
          Discover quality products at unbeatable prices. Shop now and enjoy a seamless experience.
        </p>

        <!-- Shop Now button -->
        <button
          class="btn btn-light btn-lg mt-4 me-3"
          @click="goShop"
        >
          <i class="bi bi-bag-fill me-2"></i>Shop Now
        </button>

        <!-- Login button only if NOT logged in -->
        <router-link
          v-if="!user"
          to="/login"
          class="btn btn-outline-light btn-lg mt-4"
        >
          <i class="bi bi-box-arrow-in-right me-2"></i>Login
        </router-link>
      </div>
    </div>

    <!-- Features Section -->
    <div class="container py-5">
      <div class="row text-center">
        <div class="col-md-4 mb-4">
          <i class="bi bi-truck display-4 text-primary mb-3"></i>
          <h5>Fast Delivery</h5>
          <p class="text-muted">We ship nationwide with trusted carriers to ensure your order arrives quickly.</p>
        </div>
        <div class="col-md-4 mb-4">
          <i class="bi bi-shield-check display-4 text-primary mb-3"></i>
          <h5>Secure Payments</h5>
          <p class="text-muted">Your transactions are protected with the latest encryption technologies.</p>
        </div>
        <div class="col-md-4 mb-4">
          <i class="bi bi-star-fill display-4 text-primary mb-3"></i>
          <h5>Top Quality</h5>
          <p class="text-muted">We offer only the best products, handpicked by our team of experts.</p>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="bg-light py-5">
      <div class="container text-center">
        <h3 class="fw-bold mb-3">New Here?</h3>
        <p class="mb-4 text-muted">Create an account to start shopping and enjoy exclusive member benefits.</p>
        <router-link to="/register" class="btn btn-primary btn-lg">
          <i class="bi bi-person-plus-fill me-2"></i>Register Now
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
  name: 'HomePage',
  data() {
    return {
      user: null,
    }
  },
  mounted() {
    this.user = AuthService.getCurrentUser()
  },
  methods: {
    goShop() {
      if (!this.user) {
        this.$router.push('/login')
      } else if (this.user.role === 'ROLE_ADMIN') {
        this.$router.push('/admin/dashboard')
      } else if (this.user.role === 'ROLE_USER') {
        this.$router.push('/user/products')
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.home-hero {
  border-radius: 0 0 2rem 2rem;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.btn {
  border-radius: 0.75rem;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  text-decoration: none;
}

.bi {
  color: #1d4ed8;
}

@media (max-width: 768px) {
  .home-hero {
    padding: 3rem 1rem;
    border-radius: 0 0 1.5rem 1.5rem;
  }
}
</style>
