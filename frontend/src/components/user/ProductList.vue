<template>
  <div class="container py-5">
    <div class="row g-4">
      <div class="col-12 text-end">
        <router-link to="/user/dashboard" class="btn btn-outline-secondary">
          <i class="bi bi-arrow-left me-2"></i>Back to Dashboard
        </router-link>
      </div>

      <div class="col-lg-9 mx-auto">
        <div class="row g-4">
          <div v-for="product in products" :key="product.id" class="col-12">
            <div class="card shadow-sm hover-shadow-lg transition-all">
              <div class="row g-0">
                <!-- Product Image -->
                <div class="col-md-4 position-relative">
                  <img
                    :src="product.imageUrl"
                    class="img-fluid rounded-start object-fit-cover h-100"
                    alt="Product image"
                  />
                  <div
                    class="badge bg-danger position-absolute top-0 start-0 m-2"
                  >
                    Sale
                  </div>
                </div>

                <!-- Product Details -->
                <div class="col-md-5">
                  <div class="card-body h-100 d-flex flex-column">
                    <h5 class="card-title mb-3">{{ product.name }}</h5>

                    <div class="d-flex align-items-center mb-3">
                      <div class="rating-stars me-2">
                        <i
                          v-for="star in 5"
                          :key="star"
                          class="bi bi-star-fill me-1"
                          :class="
                            star <= product.rating
                              ? 'text-warning'
                              : 'text-muted'
                          "
                        ></i>
                      </div>
                      <small class="text-muted">({{ product.rating }})</small>
                    </div>

                    <div class="d-flex flex-wrap gap-2 mb-3">
                      <span
                        class="badge bg-primary bg-opacity-10 text-primary"
                        >{{ product.spec1 }}</span
                      >
                      <span
                        class="badge bg-success bg-opacity-10 text-success"
                        >{{ product.spec2 }}</span
                      >
                      <span class="badge bg-info bg-opacity-10 text-info">{{
                        product.spec3
                      }}</span>
                    </div>

                    <p class="card-text text-muted small mb-auto line-clamp-3">
                      {{ truncateDescription(product.description) }}
                    </p>
                  </div>
                </div>

                <!-- Price & Actions -->
                <div class="col-md-3 border-start">
                  <div
                    class="card-body h-100 d-flex flex-column justify-content-between"
                  >
                    <div>
                      <div class="d-flex align-items-baseline gap-2 mb-3">
                        <h4 class="text-primary mb-0">${{ product.price }}</h4>
                        <del class="text-muted small"
                          >${{ product.originalPrice }}</del
                        >
                      </div>
                      <span
                        class="badge bg-success bg-opacity-10 text-success mb-3"
                      >
                        <i class="bi bi-truck me-1"></i>Free Shipping
                      </span>
                    </div>

                    <div class="d-grid gap-2">
                      <router-link
                        :to="`/product/${product.id}`"
                        class="btn btn-outline-primary btn-sm"
                      >
                        <i class="bi bi-eye me-2"></i>Details
                      </router-link>
                      <button
                        @click="addToCart(product.id)"
                        class="btn btn-primary btn-sm"
                      >
                        <i class="bi bi-cart-plus me-2"></i>Add to Cart
                      </button>
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
import ProductService from "@/services/ProductService"
import CartService from "@/services/CartService"

export default {
  data() {
    return {
      products: [],
    }
  },
  async created() {
    const response = await ProductService.getAllProducts()
    this.products = response.data
  },
  methods: {
    truncateDescription(text, length = 100) {
      return text.length > length ? text.substring(0, length) + "..." : text
    },
    async addToCart(productId) {
      try {
        await CartService.addToCart(productId, 1)
        alert("Product added to cart!")
      } catch (error) {
        console.error("Error adding to cart:", error)
        alert("Error adding to cart")
      }
    },
  },
}
</script>
<style scoped>
/* Improved Back Button */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.2);
}

.back-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(99, 102, 241, 0.3);
}

.back-link i {
  font-size: 1.1rem;
}

/* Enhanced Action Buttons */
.actions {
  display: flex;
  gap: 0.75rem;
  width: 100%;
}

.detail-button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  width: 100%;
  justify-content: center;
}

.detail-button:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

.cart-button {
  background: #10b981;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  width: 100%;
  justify-content: center;
}

.cart-button:hover {
  background: #059669;
  transform: translateY(-1px);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .actions {
    flex-direction: column;
  }

  .back-link {
    width: 100%;
    justify-content: center;
  }
}

@media (min-width: 1200px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
