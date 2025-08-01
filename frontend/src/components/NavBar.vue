<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">My Ecommerce</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <!-- Public Link (always visible) -->
          <li class="nav-item">
            <router-link class="nav-link" to="/" :class="{ active: isActive('/') }">Home</router-link>
          </li>

          <!-- Role-based Links -->
          <template v-if="user">
            <!-- Common for all logged in users -->
            <li class="nav-item">
              <router-link class="nav-link" :to="profileLink"
                :class="{ active: isActive(profileLink) }">Profile</router-link>
            </li>

            <!-- Admin-only links -->
            <template v-if="isAdmin">
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/dashboard"
                  :class="{ active: isActive('/admin/dashboard') }">Admin Dashboard</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/users" :class="{ active: isActive('/admin/users') }">Manage
                  Users</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/products"
                  :class="{ active: isActive('/admin/products') }">Manage Products</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/messages"
                  :class="{ active: isActive('/admin/messages') }">Contact Messages</router-link>
              </li>
            </template>

            <!-- User-only links -->
            <template v-else-if="isUser">
              <li class="nav-item">
                <router-link class="nav-link" to="/user/dashboard"
                  :class="{ active: isActive('/user/dashboard') }">Dashboard</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/user/products"
                  :class="{ active: isActive('/user/products') }">Products</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/user/cart" :class="{ active: isActive('/user/cart') }">My
                  Cart</router-link>
              </li>
            </template>
          </template>
        </ul>

        <ul class="navbar-nav">
          <!-- If no user logged in, show Login/Register -->
          <template v-if="!user">
            <li class="nav-item">
              <router-link class="nav-link" to="/login" :class="{ active: isActive('/login') }">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register"
                :class="{ active: isActive('/register') }">Register</router-link>
            </li>
          </template>

          <!-- If user is logged in, show Logout -->
          <template v-else>
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="confirmLogout">
                Logout
              </a>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import AuthService from "@/services/AuthService"

export default {
  name: "NavBar",
  data() {
    return {
      user: AuthService.getUser(),
    }
  },
  computed: {
    isAdmin() {
      return this.user && this.user.role === "ROLE_ADMIN"
    },
    isUser() {
      return this.user && this.user.role === "ROLE_USER"
    },
    profileLink() {
      // Choose profile route based on role
      if (this.isAdmin) return "/admin/profile"
      if (this.isUser) return "/user/profile"
      return "/login"
    },
  },
  methods: {
    // Check if the current route is active
    isActive(route) {
      return this.$route.path === route
    },

    // Confirm logout to prevent accidental logouts
    confirmLogout() {
      if (confirm("Are you sure you want to log out?")) {
        this.logout()
      }
    },

    // Perform logout and redirect to login page
    logout() {
      AuthService.logout()
      this.user = null
      this.$router.push("/login")
    },
  },
  created() {
    // Listen for storage changes (if login occurs in another tab, for example)
    window.addEventListener("storage", () => {
      this.user = AuthService.getUser()
    })
  },
}
</script>

<style scoped>
.navbar {
  padding: 0.8rem 1rem;
  background: linear-gradient(145deg, #0d6efd, #0b5ed7) !important;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.navbar-brand:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.nav-link {
  position: relative;
  margin: 0 0.5rem;
  padding: 0.5rem 1rem !important;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.85) !important;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.nav-link.active {
  color: #fff !important;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.15);
}

.nav-link.active::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: #fff;
  border-radius: 2px;
}

.navbar-toggler {
  border: none;
  padding: 0.5rem;
}

.navbar-toggler:focus {
  box-shadow: none;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.8)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

@media (max-width: 991px) {
  .navbar-collapse {
    padding: 1rem 0;
    background: linear-gradient(145deg, #0d6efd, #0b5ed7);
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .nav-item {
    margin: 0.25rem 0;
  }
}

/* Logout link styling */
.navbar-nav .nav-link[href="#"] {
  color: #ffcccc !important;
}

.navbar-nav .nav-link[href="#"]:hover {
  color: #fff !important;
  background: rgba(255, 0, 0, 0.1);
}
</style>
