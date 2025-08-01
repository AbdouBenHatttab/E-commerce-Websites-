<template>
  <div class="contact-us-container">
    <!-- Gradient Header -->
    <div class="contact-us-header bg-primary-gradient">
      <div class="container py-5">
        <h1 class="text-center text-white display-5 fw-bold">Contact Us</h1>
      </div>
    </div>

    <!-- Contact Form Card -->
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-lg border-0">
            <div class="card-body p-4 p-md-5">
              <form @submit.prevent="submitForm">
                <!-- Name Input -->
                <div class="form-floating mb-4">
                  <input type="text" class="form-control" id="name" v-model="form.name" required
                    placeholder="Your Name" />
                  <label for="name">
                    <i class="bi bi-person-fill me-2"></i>Your Name
                  </label>
                </div>

                <!-- Email Input -->
                <div class="form-floating mb-4">
                  <input type="email" class="form-control" id="email" v-model="form.email" required
                    placeholder="name@example.com" />
                  <label for="email">
                    <i class="bi bi-envelope-fill me-2"></i>Email Address
                  </label>
                </div>

                <!-- Message Input -->
                <div class="form-floating mb-4">
                  <textarea style="height: 130px" class="form-control" id="message" v-model="form.message" rows="4"
                    required placeholder="Your Message"></textarea>
                  <label for="message">
                    <i class="bi bi-chat-left-text-fill me-2"></i>Your Message
                  </label>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="btn btn-primary w-100 btn-lg mb-4">
                  <i class="bi bi-send me-2"></i>Send Message
                </button>

                <!-- Alerts -->
                <div v-if="statusMessage" class="alert" :class="statusClass">
                  <i class="bi" :class="statusIconClass"></i>{{ statusMessage }}
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
import ContactService from "@/services/ContactService"

export default {
  name: "ContactUs",
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
      statusMessage: "",
      statusClass: "",
    }
  },
  methods: {
    async submitForm() {
      try {
        await ContactService.createMessage(this.form)
        this.setStatus(
          "Your message has been sent successfully!",
          "text-success"
        )
        this.resetForm()
      } catch (error) {
        console.error("Error submitting contact form:", error)
        this.setStatus(
          "An error occurred. Please try again later.",
          "text-danger"
        )
      }
    },
    setStatus(message, statusClass) {
      this.statusMessage = message
      this.statusClass = statusClass
    },
    resetForm() {
      this.form = { name: "", email: "", message: "" }
    },
  },
}
</script>

<style scoped>
.contact-us-header {
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

  .contact-us-header {
    border-radius: 0 0 1.5rem 1.5rem;
  }
}
</style>
