<template>
  <div class="container py-5">
    <!-- Profile Header -->
    <div class="profile-header bg-primary-gradient">
      <div class="container py-5">
        <h1 class="text-center text-white display-5 fw-bold mb-4">
          User Profile
        </h1>
      </div>
    </div>

    <!-- Profile Content -->
    <div class="container py-5">
      <div class="row g-5 justify-content-center">
        <!-- Profile Card -->
        <div class="col-xl-4 col-lg-5">
          <div class="card profile-card shadow-lg border-0">
            <div class="card-body p-4">
              <div class="d-flex flex-column align-items-center">
                <div class="profile-avatar-wrapper mb-4">
                  <div class="profile-avatar bg-primary-soft">
                    <img
                      v-if="user.imageUrl"
                      :src="user.imageUrl"
                      class="img-fluid"
                      alt="Profile"
                    />
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      fill="currentColor"
                      class="bi bi-person-circle text-primary"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path
                        fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                      />
                    </svg>
                  </div>
                </div>
                <h2 class="h3 mb-2">{{ user.name }}</h2>
                <div class="d-flex gap-2 mb-4">
                  <span class="badge bg-primary-soft text-primary">{{
                    user.role
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Details Card -->
        <div class="col-xl-8 col-lg-7">
          <div class="card details-card shadow-lg border-0">
            <div class="card-body p-4">
              <div
                class="d-flex justify-content-between align-items-center mb-4"
              >
                <h3 class="h4 mb-0">Personal Information</h3>
                <router-link
                  to="/user/dashboard"
                  class="btn btn-outline-primary"
                >
                  <i class="bi bi-arrow-left-circle me-2"></i>Back to Dashboard
                </router-link>
              </div>

              <div class="row g-4">
                <div class="col-md-6">
                  <div class="detail-item">
                    <i class="bi bi-envelope-fill text-primary"></i>
                    <div>
                      <h6 class="mb-1">Email Address</h6>
                      <p class="mb-0 text-muted">{{ user.email }}</p>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="detail-item">
                    <i class="bi bi-person-badge-fill text-primary"></i>
                    <div>
                      <h6 class="mb-1">User Role</h6>
                      <p class="mb-0 text-muted">{{ user.role }}</p>
                    </div>
                  </div>
                </div>
              </div>
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
  name: "UserProfile",
  data() {
    return {
      user: AuthService.getUser() || {},
    }
  },
}
</script>

<style scoped>
.profile-header {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 0 0 2rem 2rem;
}

.profile-card {
  margin-top: -6rem;
  border-radius: 1.5rem;
  overflow: hidden;
}

.profile-avatar-wrapper {
  margin-top: -4rem;
}

.profile-avatar {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59, 130, 246, 0.1);
  border: 3px solid #3b82f6;
  overflow: hidden;
}

.details-card {
  border-radius: 1.5rem;
}

.detail-item {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1.25rem;
  background: rgba(243, 244, 246, 0.3);
  border-radius: 1rem;
}

.detail-item i {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.bg-primary-soft {
  background-color: rgba(13, 110, 253, 0.1);
}

@media (max-width: 768px) {
  .profile-card {
    margin-top: -4rem;
  }

  .profile-avatar {
    width: 6rem;
    height: 6rem;
  }
}
</style>
