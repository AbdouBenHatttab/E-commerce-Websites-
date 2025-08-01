<template>
  <div class="container py-5">
    <div v-if="product" class="card shadow-lg border-0 overflow-hidden">
      <!-- Product Content -->
      <div class="row g-0">
        <!-- Image Section -->
        <div class="col-lg-6 position-relative">
          <img
            :src="product.imageUrl"
            class="img-fluid rounded-start object-fit-cover h-100"
            alt="Product image"
            style="min-height: 300px; max-height: 500px"
          />
          <div class="position-absolute top-0 start-0 m-3">
            <span class="badge bg-danger fs-6">-{{ discountPercentage }}%</span>
          </div>
        </div>

        <!-- Details Section -->
        <div class="col-lg-6">
          <div class="card-body p-4 p-xl-5">
            <!-- Product Info -->
            <h1 class="mb-3">{{ product.name }}</h1>

            <!-- Price -->
            <div class="d-flex align-items-baseline gap-3 mb-4">
              <h2 class="text-primary">${{ product.price }}</h2>
            </div>

            <!-- Specifications -->
            <div class="row g-3 mb-4">
              <div
                class="col-md-6"
                v-for="(spec, index) in productSpecs"
                :key="index"
              >
                <div class="bg-light p-3 rounded">
                  <span class="text-muted d-block small">{{ spec.label }}</span>
                  <strong>{{ spec.value }}</strong>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="mb-4">
              <h4 class="mb-3">Description</h4>
              <p class="text-muted" style="white-space: pre-wrap">
                {{ product.description }}
              </p>
            </div>

            <!-- Add to Cart -->
            <div class="d-grid gap-3">
              <button class="btn btn-primary btn-lg py-3" @click="addToCart">
                <i class="bi bi-cart-plus me-2"></i>Add to Cart
              </button>
              <button class="btn btn-outline-secondary" @click="$router.go(-1)">
                <i class="bi bi-arrow-left me-2"></i>Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-muted">Loading product details...</p>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/ProductService"
import CartService from "@/services/CartService"

export default {
  name: "ProductDetail",
  props: ["id"],
  data() {
    return {
      product: null,
    }
  },
  computed: {
    productSpecs() {
      if (!this.product) return []
      return [
        { label: "Category", value: this.product.category },
        { label: "Stock", value: `${this.product.stock} available` },
      ]
    },
  },
  async created() {
    try {
      const response = await ProductService.getProductById(this.id)
      this.product = response.data
    } catch (error) {
      console.error("Error fetching product:", error)
      this.$router.replace("/products")
    }
  },
  methods: {
    async addToCart() {
      try {
        await CartService.addToCart(this.product.id, 1)
        window.alert("Product added to cart!")
      } catch (error) {
        console.error(
          "Error adding to cart:",
          error.response?.data || error.message
        )
        window.alert(error.response?.data?.message || "Failed to add to cart")
        if (error.response?.status === 401) {
          this.$router.push("/login")
        }
      }
    },
  },
}
</script>

<style scoped>
.object-fit-cover {
  margin-top: 120px;
  margin-left: 80px;
  object-fit: cover;
}

.rating-stars {
  font-size: 1.25rem;
}

.card {
  border-radius: 1rem;
  overflow: hidden;
}

.badge {
  font-size: 1rem;
  padding: 0.5em 0.75em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bg-light {
  background-color: #f8f9fa !important;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
