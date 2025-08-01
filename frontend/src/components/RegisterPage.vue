<template>
  <div class="register-container">
    <!-- Gradient Header -->
    <div class="register-header bg-primary-gradient">
      <div class="container py-5">
        <h1 class="text-center text-white display-5 fw-bold">Create Account</h1>
      </div>
    </div>

    <!-- Registration Card -->
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-lg border-0">
            <div class="card-body p-4 p-md-5">
              <form @submit.prevent="register">
                <!-- Name Input -->
                <div class="form-floating mb-4">
                  <input type="text" class="form-control" id="name" v-model="user.name" required
                    placeholder="John Doe" />
                  <label for="name">
                    <i class="bi bi-person-fill me-2"></i>Full Name
                  </label>
                </div>

                <!-- Email Input -->
                <div class="form-floating mb-4">
                  <input type="email" class="form-control" id="email" v-model="user.email" required
                    placeholder="name@example.com" />
                  <label for="email">
                    <i class="bi bi-envelope-fill me-2"></i>Email Address
                  </label>
                </div>

                <!-- Password Input -->
                <div class="form-floating mb-4">
                  <input type="password" class="form-control" id="password" v-model="user.password" required
                    placeholder="Password" />
                  <label for="password">
                    <i class="bi bi-lock-fill me-2"></i>Password
                  </label>
                </div>

                <!-- Phone Number Input -->
                <div class="form-floating mb-4">
                  <input type="tel" class="form-control" id="phone" v-model="user.phoneNumber"
                    placeholder="Phone Number" />
                  <label for="phone">
                    <i class="bi bi-telephone-fill me-2"></i>Phone Number
                  </label>
                </div>

                <!-- Address Input -->
                <div class="form-floating mb-4">
                  <input type="text" class="form-control" id="address" v-model="user.address" placeholder="Address" />
                  <label for="address">
                    <i class="bi bi-geo-alt-fill me-2"></i>Address
                  </label>
                </div>

                <!-- Profile Image Upload 
                <div class="mb-4">
                  <label class="form-label">
                    <i class="bi bi-image-fill me-2"></i>Profile Image
                  </label>
                  <div class="file-upload-wrapper">
                    <input
                      type="file"
                      class="form-control"
                    />
                    <small class="text-muted mt-1 d-block">
                      {{ image ? image.name : 'No file chosen' }}
                    </small>
                  </div>
                </div>-->

                <!-- Submit Button -->
                <button type="submit" class="btn btn-primary w-100 btn-lg mb-4" :disabled="loading">
                  <i class="bi bi-person-plus-fill me-2"></i>
                  {{ loading ? "Creating Account..." : "Register" }}
                </button>

                <!-- Message Alert -->
                <div v-if="message" class="alert mb-4" :class="messageType === 'alert-success'
                  ? 'alert-success'
                  : 'alert-danger'
                  ">
                  <i :class="messageType === 'alert-success'
                    ? 'bi bi-check-circle-fill'
                    : 'bi bi-exclamation-circle-fill'
                    " class="me-2"></i>
                  {{ message }}
                </div>

                <!-- Login Link -->
                <div class="text-center text-muted">
                  <p class="mb-0">
                    Already have an account?
                    <router-link to="/login" class="text-primary fw-bold text-decoration-none">
                      Sign in here
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
import AuthService from "@/services/AuthService"

export default {
  name: "RegisterPage",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        status: "ACTIVE",
        role: "ROLE_USER",
      },
      image: null,
      message: "",
      messageType: "alert-info",
      loading: false,
    }
  },
  methods: {
    handleFileUpload(event) {
      this.image = event.target.files[0]
    },
    async register() {
      this.loading = true
      try {
        const formData = new FormData()
        Object.keys(this.user).forEach((key) => {
          formData.append(key, this.user[key])
        })

        if (this.image) {
          formData.append("image", this.image)
        }

        await AuthService.register(formData)
        this.message = "Registration successful! Redirecting to login..."
        this.messageType = "alert-success"

        setTimeout(() => {
          this.$router.push({ name: "Login" })
        }, 2000)
      } catch (err) {
        this.message =
          err.response?.data?.message ||
          "Registration failed. Please try again."
        this.messageType = "alert-danger"
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.register-header {
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

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(59, 130, 246, 0.2);
}

.btn-primary:disabled {
  opacity: 0.7;
}

.alert {
  border-radius: 0.75rem;
  padding: 1rem;
}

.file-upload-wrapper input[type="file"] {
  padding: 0.5rem;
  border: 2px dashed #e5e7eb;
  border-radius: 0.75rem;
}

.file-upload-wrapper input[type="file"]:focus {
  border-color: #3b82f6;
}

@media (max-width: 768px) {
  .card {
    margin-top: -2rem;
  }

  .register-header {
    border-radius: 0 0 1.5rem 1.5rem;
  }
}
</style>
