<template>
  <div class="admin-products-container">
    <!-- Header Section -->
    <div class="admin-header">
      <h2 class="admin-title">Product Management</h2>
      <button class="admin-btn primary" @click="openModal(false)">
        <i class="fas fa-plus"></i> Add Product
      </button>
    </div>

    <!-- Products Grid -->
    <div v-if="products.length" class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-image">
          <img
            :src="
              product.imageUrl ||
              'https://via.placeholder.com/300x200.png/2a2a2a/ffffff?text=Product+Image'
            "
            alt="Product Image"
            class="product-img"
          />
          <div class="product-actions">
            <button class="icon-btn edit" @click="openModal(true, product)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="icon-btn delete" @click="confirmDelete(product.id)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-title">{{ product.name }}</h3>
          <p class="product-description">
            {{ truncateDescription(product.description) }}
          </p>
          <div class="product-meta">
            <div class="meta-item">
              <i class="fas fa-tag"></i>
              <span>${{ product.price.toFixed(2) }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-cubes"></i>
              <span>{{ product.stock }} in stock</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-folder"></i>
              <span>{{ product.category }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <i class="fas fa-box-open empty-icon"></i>
      <h3>No Products Found</h3>
      <p>Start by adding your first product</p>
    </div>

    <!-- Product Modal -->
    <div class="modal-overlay" :class="{ active: modalVisible }">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ isEditing ? "Edit Product" : "New Product" }}</h3>
          <button class="modal-close" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form class="modal-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label>Product Name</label>
            <input type="text" v-model="newProduct.name" required />
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea
              v-model="newProduct.description"
              rows="3"
              required
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                step="0.01"
                v-model.number="newProduct.price"
                required
              />
            </div>
            <div class="form-group">
              <label>Stock Quantity</label>
              <input type="number" v-model.number="newProduct.stock" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Category</label>
              <input type="text" v-model="newProduct.category" required />
            </div>
            <div class="form-group">
              <label>Image URL</label>
              <input type="url" v-model="newProduct.imageUrl" />
            </div>
          </div>

          <div class="form-actions">
            <button
              type="button"
              class="admin-btn secondary"
              @click="closeModal"
            >
              Cancel
            </button>
            <button type="submit" class="admin-btn primary">
              {{ isEditing ? "Update Product" : "Create Product" }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <button @click="goBack" class="btn btn-outline-primary btn-lg">
      <i class="bi bi-arrow-left-circle me-2"></i>Back to Dashboard
    </button>
  </div>
</template>

<script>
import ProductService from "@/services/ProductService"

export default {
  name: "AdminProducts",
  data() {
    return {
      products: [],
      isEditing: false,
      modalVisible: false,
      newProduct: this.resetProduct(),
    }
  },
  async created() {
    await this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await ProductService.getAllProducts()
        this.products = response.data
      } catch (error) {
        this.showError("Failed to fetch products", error)
      }
    },
    openModal(editMode, product = null) {
      this.isEditing = editMode
      this.newProduct = product ? { ...product } : this.resetProduct()
      this.modalVisible = true
    },
    async submitForm() {
      try {
        if (this.isEditing) {
          await ProductService.updateProduct(
            this.newProduct.id,
            this.newProduct
          )
        } else {
          const response = await ProductService.createProduct(this.newProduct)
          this.products.push(response.data)
        }
        this.closeModal()
        await this.fetchProducts()
      } catch (error) {
        this.showError(
          this.isEditing ? "Update failed" : "Creation failed",
          error
        )
      }
    },
    async confirmDelete(id) {
      if (confirm("Are you sure you want to delete this product?")) {
        try {
          await ProductService.deleteProduct(id)
          this.products = this.products.filter((p) => p.id !== id)
        } catch (error) {
          this.showError("Deletion failed", error)
        }
      }
    },
    closeModal() {
      this.modalVisible = false
      this.resetProduct()
    },
    resetProduct() {
      return {
        id: null,
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        imageUrl: "",
      }
    },
    truncateDescription(text, length = 100) {
      return text.length > length ? text.substring(0, length) + "..." : text
    },
    showError(message, error) {
      console.error(message, error)
      alert(`${message}: ${error.response?.data?.message || error.message}`)
    },
    goBack() {
      this.$router.push({ name: "AdminDashboard" })
    },
  },
}
</script>

<style scoped>
.admin-products-container {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  margin-bottom: 10px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.admin-title {
  font-size: 2rem;
  font-weight: 600;
  color: #2d3748;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.product-image {
  position: relative;
  height: 200px;
  background: #f8fafc;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-actions {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.icon-btn.edit {
  background: #3b82f6;
  color: white;
}

.icon-btn.delete {
  background: #ef4444;
  color: white;
}

.icon-btn:hover {
  opacity: 0.9;
  transform: scale(1.05);
}

.product-info {
  padding: 1.5rem;
}

.product-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.product-description {
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.product-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #475569;
}

.meta-item i {
  color: #94a3b8;
}

.empty-state {
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 3rem;
  color: #cbd5e1;
  margin-bottom: 1rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-overlay.active {
  display: flex;
}

.modal-container {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-close {
  border: none;
  background: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.5rem;
}

.modal-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #475569;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.admin-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.admin-btn.primary {
  background: #3b82f6;
  color: white;
}

.admin-btn.secondary {
  background: #e2e8f0;
  color: #475569;
}

.admin-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>
