<template>
  <div class="container py-5">
    <div id="productsCarousel" class="carousel slide" data-bs-ride="carousel">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li v-for="(slide, index) in chunkedProducts" :key="index" data-bs-target="#productsCarousel"
          :data-bs-slide-to="index" :class="{ active: index === 0 }"></li>
      </ol>

      <!-- Carousel Items -->
      <div class="carousel-inner">
        <div v-for="(chunk, index) in chunkedProducts" :key="index" class="carousel-item"
          :class="{ active: index === 0 }">
          <div class="row g-4">
            <div v-for="product in chunk" :key="product.id" class="col-lg-3 col-md-6 d-flex">
              <div class="thumb-wrapper w-100">
                <span class="wish-icon" @click="toggleWishlist(product)">
                  <i :class="[
                    'bi',
                    product.isWished ? 'bi-heart-fill' : 'bi-heart',
                  ]"></i>
                </span>
                <div class="img-box">
                  <img :src="product.imageUrl" class="img-fluid" alt="Product image" />
                </div>
                <div class="thumb-content d-flex flex-column">
                  <h4 class="mb-2">{{ product.name }}</h4>
                  <div class="star-rating mb-2">
                    <i v-for="star in 5" :key="star" class="bi" :class="star <= product.rating ? 'bi-star-fill' : 'bi-star'
                      "></i>
                  </div>
                  <p class="item-price mt-auto">
                    <strike v-if="product.originalPrice" class="text-muted small">${{ product.originalPrice }}</strike>
                    <b class="text-primary fs-5">${{ product.price }}</b>
                  </p>
                  <div class="d-grid gap-2 mt-2">
                    <router-link :to="`/product/${product.id}`" class="btn btn-primary btn-sm">
                      <i class="bi bi-eye me-2"></i>View Product
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls aligned with button -->
      <a class="carousel-control-prev" href="#productsCarousel" role="button" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </a>
      <a class="carousel-control-next" href="#productsCarousel" role="button" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/ProductService"

export default {
  name: "VisitorProducts",
  data() {
    return {
      products: [],
      itemsPerSlide: 4,
    }
  },
  computed: {
    chunkedProducts() {
      const chunks = []
      for (let i = 0; i < this.products.length; i += this.itemsPerSlide) {
        chunks.push(this.products.slice(i, i + this.itemsPerSlide))
      }
      return chunks
    },
  },
  async created() {
    const response = await ProductService.getAllProducts()
    this.products = response.data.map((p) => ({ ...p, isWished: false }))
  },
  methods: {
    toggleWishlist(product) {
      product.isWished = !product.isWished
    },
  },
}
</script>

<style scoped>
.carousel {
  margin: 50px auto;
  padding: 0 20px;
}

.thumb-wrapper {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.img-box {
  height: 200px;
  width: 100%;
  flex-shrink: 0;
  margin-bottom: 1rem;
}

.img-box img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.thumb-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

h4 {
  font-size: 1.1rem;
  min-height: 3rem;
}

.star-rating {
  color: #ffc000;
  font-size: 0.9rem;
}

.item-price {
  margin-top: auto;
}

.btn {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
}

.wish-icon {
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 2;
  cursor: pointer;
  font-size: 1.25rem;
  color: #abb0b8;
  transition: color 0.2s;
}

.wish-icon:hover {
  color: #ff6161;
}

.carousel-control-prev,
.carousel-control-next {
  width: 40px;
  height: 40px;
  background: #7ac400;
  border-radius: 50%;
  opacity: 0.9;
  top: 50%;
  transform: translateY(-50%);
  bottom: auto;
  margin-top: 60px;
  /* Align with button */
}

.carousel-control-prev {
  left: -50px;
}

.carousel-control-next {
  right: -50px;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  opacity: 1;
  background: #68b000;
}

@media (max-width: 992px) {
  .carousel-control-prev {
    left: -30px;
  }

  .carousel-control-next {
    right: -30px;
  }
}

@media (max-width: 768px) {

  .carousel-control-prev,
  .carousel-control-next {
    display: none;
  }

  .img-box {
    height: 150px;
  }

  .thumb-wrapper {
    padding: 15px;
  }
}
</style>
