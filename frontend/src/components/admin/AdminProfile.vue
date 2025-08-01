<template>
  <div class="container py-5">
    <h2 class="text-center mb-5 display-4 text-primary fw-bold">
      Admin Profile
    </h2>

    <!-- Loading State -->
    <div v-if="!user" class="d-flex justify-content-center py-5">
      <div
        class="spinner-border text-primary"
        style="width: 3rem; height: 3rem"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Profile Section -->
    <div v-else>
      <div class="row justify-content-center g-4">
        <!-- Profile Image and Info -->
        <div class="col-lg-4 col-md-6">
          <div class="card border-0 shadow-lg h-100">
            <div class="card-body text-center p-4">
              <div class="position-relative d-inline-block">
                <img
                  v-if="user.imageUrl"
                  :src="user.imageUrl"
                  class="img-fluid rounded-circle shadow-lg"
                  alt="User Image"
                  style="
                    width: 180px;
                    height: 180px;
                    object-fit: cover;
                    border: 4px solid #fff;
                  "
                />
                <div
                  v-else
                  class="rounded-circle bg-primary d-flex align-items-center justify-content-center"
                  style="width: 180px; height: 180px; border: 4px solid #fff"
                >
                  <i
                    class="bi bi-person-fill text-white"
                    style="font-size: 5rem"
                  ></i>
                </div>
              </div>
              <h3 class="mt-4 mb-2 fw-bold text-dark">{{ user.name }}</h3>
              <div
                class="badge bg-primary bg-opacity-25 text-primary fs-6 mb-3"
              >
                {{ user.role }}
              </div>
              <div class="d-flex justify-content-center gap-2">
                <span class="badge bg-success bg-opacity-25 text-success">{{
                  user.status
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- User Info and Actions -->
        <div class="col-md-6">
          <div class="card border-0 shadow-lg h-100">
            <div class="card-body p-4">
              <h4 class="card-title mb-4 text-primary fw-bold">
                Personal Information
              </h4>
              <ul class="list-unstyled fs-5">
                <li class="mb-3">
                  <i class="bi bi-envelope-fill me-2 text-primary"></i>
                  <strong>Email:</strong> {{ user.email }}
                </li>
                <li class="mb-3">
                  <i class="bi bi-telephone-fill me-2 text-primary"></i>
                  <strong>Phone:</strong> {{ user.phoneNumber || "N/A" }}
                </li>
                <li class="mb-3">
                  <i class="bi bi-geo-alt-fill me-2 text-primary"></i>
                  <strong>Address:</strong> {{ user.address || "N/A" }}
                </li>
              </ul>
              <div class="d-grid gap-3 mt-auto">
                <button @click="showModal" class="btn btn-primary btn-lg">
                  <i class="bi bi-pencil-square me-2"></i>Edit Profile
                </button>
                <button @click="goBack" class="btn btn-outline-primary btn-lg">
                  <i class="bi bi-arrow-left-circle me-2"></i>Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div
      v-if="isModalVisible"
      class="modal fade show"
      tabindex="-1"
      style="display: block; background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Edit Profile</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body p-4">
            <form @submit.prevent="updateProfile">
              <div class="mb-4">
                <label for="name" class="form-label">Name</label>
                <input
                  id="name"
                  type="text"
                  class="form-control form-control-lg"
                  v-model="userForm.name"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="email" class="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  class="form-control form-control-lg"
                  v-model="userForm.email"
                  required
                  disabled
                />
              </div>
              <div class="mb-4">
                <label for="phoneNumber" class="form-label">Phone Number</label>
                <input
                  id="phoneNumber"
                  type="text"
                  class="form-control form-control-lg"
                  v-model="userForm.phoneNumber"
                />
              </div>
              <div class="mb-4">
                <label for="address" class="form-label">Address</label>
                <input
                  id="address"
                  type="text"
                  class="form-control form-control-lg"
                  v-model="userForm.address"
                />
              </div>
              <div class="d-grid gap-3">
                <button type="submit" class="btn btn-primary btn-lg">
                  <i class="bi bi-save me-2"></i>Save Changes
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-lg"
                  @click="closeModal"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService"
import UserService from "@/services/UserService"

export default {
  name: "AdminProfile",
  data() {
    return {
      user: null,
      userForm: {
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
      },
      isModalVisible: false,
    }
  },
  async mounted() {
    this.fetchAdminProfile()
  },
  methods: {
    async fetchAdminProfile() {
      try {
        const user = AuthService.getCurrentUser()
        if (user) {
          this.user = user
          this.userForm = { ...this.user }
        } else {
          console.error("User is not logged in.")
        }
      } catch (error) {
        console.error("Error fetching admin profile:", error)
      }
    },
    showModal() {
      this.isModalVisible = true
    },
    closeModal() {
      this.isModalVisible = false
    },
    async updateProfile() {
      try {
        const userId = this.user.id
        const updatedUserData = { ...this.userForm }
        const response = await UserService.updateUser(userId, updatedUserData)
        AuthService.setUser(response.data)
        this.user = { ...response.data }
        this.closeModal()
      } catch (error) {
        console.error("Error updating profile:", error)
      }
    },
    goBack() {
      this.$router.push({ name: "AdminDashboard" })
    },
  },
}
</script>

<style scoped>
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 1rem;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

.badge {
  padding: 0.5em 1em;
  border-radius: 0.75rem;
}

.btn-lg {
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
}

.modal-content {
  border-radius: 1rem;
}

.form-control {
  border-radius: 0.75rem;
  padding: 0.75rem 1.25rem;
}

.form-control:focus {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
</style>
