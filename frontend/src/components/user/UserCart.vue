<template>
  <div class="container py-5">
    <!-- Cart Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0 display-6 fw-bold text-primary">Shopping Cart</h2>
      <router-link to="/user/products" class="btn btn-outline-primary">
        <i class="bi bi-arrow-left me-2"></i>Continue Shopping
      </router-link>
    </div>

    <!-- Empty State -->
    <div v-if="cartItems.length === 0" class="empty-cart text-center py-5">
      <div class="empty-icon mb-4">
        <i class="bi bi-cart-x fs-1 text-muted"></i>
      </div>
      <h3 class="text-secondary mb-3">Your cart is empty</h3>
      <p class="text-muted">Start adding items to see them here</p>
    </div>

    <!-- Cart Items -->
    <div v-else class="cart-items">
      <div class="row g-4">
        <div v-for="item in cartItems" :key="item.product.id" class="col-12">
          <div class="card shadow-sm border-0 h-100">
            <div class="card-body p-4">
              <div class="row g-4 align-items-center">
                <!-- Product Image -->
                <div class="col-md-3">
                  <img
                    :src="item.product.imageUrl"
                    alt="Product image"
                    class="img-fluid rounded-3"
                    style="height: 150px; object-fit: cover"
                  />
                </div>

                <!-- Product Info -->
                <div class="col-md-6">
                  <h5 class="card-title fw-bold mb-2">
                    {{ item.product.name }}
                  </h5>
                  <p class="text-muted mb-2">
                    SKU: {{ item.product.sku || "N/A" }}
                  </p>
                  <div class="d-flex align-items-center gap-2">
                    <span class="h5 mb-0">${{ item.product.price }}</span>
                    <small class="text-muted">each</small>
                  </div>
                </div>

                <!-- Quantity Controls -->
                <div class="col-md-3">
                  <div class="d-flex flex-column gap-3">
                    <div class="d-flex align-items-center gap-2">
                      <button
                        @click="
                          updateQuantity(item.product.id, item.quantity - 1)
                        "
                        class="btn btn-outline-secondary"
                        :disabled="item.quantity <= 1"
                      >
                        <i class="bi bi-dash"></i>
                      </button>

                      <input
                        type="number"
                        class="form-control text-center"
                        v-model.number="item.quantity"
                        @change="updateQuantity(item.product.id, item.quantity)"
                        min="1"
                        style="max-width: 70px"
                      />

                      <button
                        @click="
                          updateQuantity(item.product.id, item.quantity + 1)
                        "
                        class="btn btn-outline-secondary"
                      >
                        <i class="bi bi-plus"></i>
                      </button>
                    </div>

                    <button
                      @click="removeFromCart(item.product.id)"
                      class="btn btn-link text-danger p-0"
                    >
                      <i class="bi bi-trash me-2"></i>Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="row mt-5">
        <div class="col-lg-4 ms-auto">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
              <h5 class="fw-bold mb-4">Order Summary</h5>
              <div class="d-flex justify-content-between mb-3">
                <span>Subtotal ({{ itemCount }} items)</span>
                <span>${{ subtotal }}</span>
              </div>
              <div class="d-flex justify-content-between mb-4">
                <span>Estimated Tax</span>
                <span>${{ tax }}</span>
              </div>
              <hr class="my-3" />
              <div class="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>${{ total }}</span>
              </div>
              <button
                class="btn btn-primary w-100 mt-4"
                @click="proceedToCheckout"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartService from "@/services/CartService"
import AuthService from "@/services/AuthService"

export default {
  name: "UserCart",
  data() {
    return {
      cartItems: [],
      userId: null,
      taxRate: 0.05, // Example tax rate
    }
  },
  computed: {
    itemCount() {
      return this.cartItems.reduce((acc, item) => acc + item.quantity, 0)
    },
    subtotal() {
      return this.cartItems
        .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
        .toFixed(2)
    },
    tax() {
      return (parseFloat(this.subtotal) * this.taxRate).toFixed(2)
    },
    total() {
      return (parseFloat(this.subtotal) + parseFloat(this.tax)).toFixed(2)
    },
  },
  async created() {
    const user = AuthService.getCurrentUser()
    if (user) {
      this.userId = user.id
      await this.fetchCartItems()
    } else {
      console.error("User is not logged in")
    }
  },
  methods: {
    async fetchCartItems() {
      try {
        const response = await CartService.getCart(this.userId)
        console.log("Cart response:", response.data) // Debugging

        this.cartItems = response.data.items.map((item) => ({
          product: {
            id: item.productId,
            name: item.productName,
            price: item.price,
            imageUrl: item.imageUrl, // Ensure this is coming correctly
          },
          quantity: item.quantity,
        }))
      } catch (error) {
        console.error("Error fetching cart items:", error)
      }
    },
    async removeFromCart(productId) {
      try {
        await CartService.removeFromCart(productId) // FIXED: Removed userId from params
        this.cartItems = this.cartItems.filter(
          (item) => item.product.id !== productId
        )
      } catch (error) {
        console.error("Error removing item from cart:", error)
      }
    },
    async updateQuantity(productId, newQuantity) {
      if (newQuantity < 1) return
      try {
        await CartService.updateQuantity(productId, newQuantity)
        const item = this.cartItems.find((i) => i.product.id === productId)
        if (item) item.quantity = newQuantity
      } catch (error) {
        console.error("Error updating quantity:", error)
      }
    },
    proceedToCheckout() {
      alert("Proceeding to checkout...")
    },
  },
}
</script>

<style scoped>
.cart-items {
  transition: all 0.3s ease;
}
.card {
  border-radius: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}
.btn-outline-secondary {
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
