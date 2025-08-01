<template>
  <div class="login-container">
    <!-- Gradient Header -->
    <div class="login-header bg-primary-gradient">
      <div class="container py-5">
        <h1 class="text-center text-white display-5 fw-bold">Welcome Back</h1>
      </div>
    </div>

    <!-- Login Card -->
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-lg border-0">
            <div class="card-body p-4 p-md-5">
              <form @submit.prevent="login">
                <!-- Email Input -->
                <div class="form-floating mb-4">
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    v-model="email"
                    required
                    autocomplete="email"
                    placeholder="name@example.com"
                  />
                  <label for="email">
                    <i class="bi bi-envelope-fill me-2"></i>Email address
                  </label>
                </div>

                <!-- Password Input -->
                <div class="form-floating mb-4">
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="password"
                    required
                    autocomplete="current-password"
                    placeholder="Password"
                  />
                  <label for="password">
                    <i class="bi bi-lock-fill me-2"></i>Password
                  </label>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="btn btn-primary w-100 btn-lg mb-4">
                  <i class="bi bi-box-arrow-in-right me-2"></i>Sign In
                </button>

                <!-- Alerts -->
                <div v-if="error" class="alert alert-danger mb-4">
                  <i class="bi bi-exclamation-circle-fill me-2"></i>{{ error }}
                </div>
                <div v-if="success" class="alert alert-success mb-4">
                  <i class="bi bi-check-circle-fill me-2"></i>{{ success }}
                </div>

                <!-- Registration Link -->
                <div class="text-center text-muted mt-4">
                  <p class="mb-0">
                    Don't have an account?
                    <router-link
                      to="/register"
                      class="text-primary fw-bold text-decoration-none"
                    >
                      Create one now
                    </router-link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      success: "",
    };
  },
  methods: {
    async login() {
      // Clear old session before login
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];

      try {
        const response = await axios.post("http://localhost:8080/auth/login", {
          email: this.email,
          password: this.password,
        });

        const token = response.data.token;
        const user = response.data.user || response.data; // adjust if user is nested

        if (token) {
          // Save session
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          this.success = "Login successful!";
          this.error = "";

          // Redirect and refresh page
          this.$router.replace({ name: "UserDashboard" }).then(() => {
            window.location.reload();
          });
        } else {
          this.error = "Login failed: token not received.";
          this.success = "";
        }
      } catch (err) {
        this.error = "Invalid credentials. Please try again.";
        this.success = "";
        console.error("Login failed:", err);
      }
    },
  },
};
</script>

<style scoped>
.login-header {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 0 0 2rem 2rem;
}

.card {
  border-radius: 1.5rem;
  margin-top: -4rem;
}

.form-control {
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
}

.form-control:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  border-color: #3b82f6;
}

.btn-primary {
  border-radius: 0.75rem;
  padding: 1rem;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(59, 130, 246, 0.2);
}

.alert {
  border-radius: 0.75rem;
}

.text-primary {
  color: #3b82f6 !important;
}

@media (max-width: 768px) {
  .card {
    margin-top: -2rem;
  }

  .login-header {
    border-radius: 0 0 1.5rem 1.5rem;
  }
}
</style>
