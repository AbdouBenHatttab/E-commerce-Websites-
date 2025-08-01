<template>
  <div class="container py-4">
    <div class="card shadow-lg border-0 overflow-hidden">
      <div class="card-header bg-primary bg-gradient py-3 border-0">
        <div class="d-flex align-items-center justify-content-between">
          <h3 class="mb-0 text-white">
            <i class="bi bi-people-fill me-2"></i>User Management
          </h3>
          <button class="btn btn-light btn-sm" @click="fetchUsers">
            <i class="bi bi-arrow-clockwise"></i>
          </button>
        </div>
      </div>

      <div class="card-body p-0">
        <div class="table-responsive rounded-3">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th class="ps-4 text-uppercase text-secondary fw-500 small">
                  ID
                </th>
                <th class="text-uppercase text-secondary fw-500 small">Name</th>
                <th class="text-uppercase text-secondary fw-500 small">
                  Email
                </th>
                <th class="text-uppercase text-secondary fw-500 small">
                  Phone
                </th>
                <th class="text-uppercase text-secondary fw-500 small">
                  Address
                </th>
                <th class="text-uppercase text-secondary fw-500 small">Role</th>
                <th class="text-uppercase text-secondary fw-500 small">
                  Status
                </th>
                <th
                  class="text-end pe-4 text-uppercase text-secondary fw-500 small"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in users"
                :key="user.id"
                class="transition-effect"
              >
                <td class="ps-4 fw-semibold text-muted">#{{ user.id }}</td>
                <td>
                  <input
                    v-model="user.name"
                    class="form-control form-control-sm border-0 bg-light focus-ring"
                  />
                </td>
                <td class="text-truncate" style="max-width: 200px">
                  {{ user.email }}
                </td>
                <td>
                  <input
                    v-model="user.phoneNumber"
                    class="form-control form-control-sm border-0 bg-light focus-ring"
                    type="tel"
                  />
                </td>
                <td>
                  <input
                    v-model="user.address"
                    class="form-control form-control-sm border-0 bg-light focus-ring"
                  />
                </td>
                <td>
                  <select
                    v-model="user.role"
                    class="form-select form-select-sm border-0 bg-light focus-ring"
                    :class="{
                      'text-primary': user.role === 'ROLE_ADMIN',
                      'text-body': user.role === 'ROLE_USER',
                    }"
                  >
                    <option value="ROLE_USER">User</option>
                    <option value="ROLE_ADMIN">Admin</option>
                  </select>
                </td>
                <td>
                  <select
                    v-model="user.status"
                    class="form-select form-select-sm border-0 bg-light focus-ring"
                    :class="{
                      'text-success': user.status === 'ACTIVE',
                      'text-danger': user.status === 'INACTIVE',
                    }"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </td>
                <td class="text-end pe-4">
                  <div class="d-flex gap-2 justify-content-end">
                    <button
                      class="btn btn-sm btn-success px-3 py-1"
                      @click="updateUser(user)"
                    >
                      <i class="bi bi-check-lg me-1"></i>
                      <span class="d-none d-md-inline">Save</span>
                    </button>
                    <button
                      class="btn btn-sm btn-danger px-3 py-1"
                      @click="deleteUser(user.id)"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4 d-flex justify-content-between px-4 pb-3">
          <button class="btn btn-outline-secondary" @click="goBack">
            <i class="bi bi-arrow-left me-1"></i>Back
          </button>
          <small class="text-muted">Showing {{ users.length }} users</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService"

export default {
  name: "AdminUsers",
  data() {
    return {
      users: [],
    }
  },
  async created() {
    await this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await UserService.getAllUsers()
        this.users = response.data
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    },
    async updateUser(user) {
      try {
        await UserService.updateUser(user.id, {
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          role: user.role,
          status: user.status,
        })
        alert("User updated successfully!")
      } catch (error) {
        console.error("Error updating user:", error)
        alert("Failed to update user.")
      }
    },
    async deleteUser(id) {
      try {
        await UserService.deleteUser(id)
        this.users = this.users.filter((user) => user.id !== id)
        alert("User deleted successfully!")
      } catch (error) {
        console.error("Error deleting user:", error)
        alert("Failed to delete user.")
      }
    },
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
.card-header {
  border-bottom: 3px solid rgba(255, 255, 255, 0.1);
}

.table-hover tbody tr {
  border-bottom: 1px solid #f0f0f0;
}

.table-hover tbody tr:hover {
  background-color: #f8f9fa;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.transition-effect {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.focus-ring {
  transition: all 0.2s ease;
}

.focus-ring:focus {
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.15) !important;
  background-color: white !important;
}

.form-select-sm {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 16px 12px;
}

@media (max-width: 768px) {
  .table thead {
    display: none;
  }

  .table,
  .table tbody,
  .table tr,
  .table td {
    display: block;
    width: 100%;
  }

  .table tr {
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .table td {
    text-align: right;
    padding: 0.75rem;
    position: relative;
  }

  .table td::before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 500;
    color: #6c757d;
    font-size: 0.875em;
  }

  .text-truncate {
    max-width: 100% !important;
  }

  .form-control-sm {
    max-width: 100% !important;
    text-align: right !important;
  }
}
</style>
