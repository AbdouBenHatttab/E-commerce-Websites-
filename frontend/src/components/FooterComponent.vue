<template>
  <footer class="footer bg-dark text-light pt-5 pb-3">
    <div class="container">
      <div class="row g-4">
        <!-- About Section -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="footer-section">
            <h5 class="footer-title mb-4">About Us</h5>
            <p class="footer-text opacity-75">
              We are a global leader in e-commerce, providing top-quality
              products to customers worldwide. Experience shopping like never
              before with us.
            </p>
          </div>
        </div>

        <!-- Quick Links Section -->
        <div class="col-lg-2 col-md-6 mb-4">
          <div class="footer-section">
            <h5 class="footer-title mb-4">Quick Links</h5>
            <ul class="list-unstyled">
              <li class="mb-3">
                <router-link class="footer-link" to="/">
                  <i class="bi bi-chevron-right me-2"></i>Home
                </router-link>
              </li>
              <li class="mb-3">
                <router-link class="footer-link" to="/user/products">
                  <i class="bi bi-chevron-right me-2"></i>Products
                </router-link>
              </li>
              <li class="mb-3">
                <router-link class="footer-link" to="/user/cart">
                  <i class="bi bi-chevron-right me-2"></i>My Cart
                </router-link>
              </li>
              <li class="mb-3">
                <router-link class="footer-link" to="/contact">
                  <i class="bi bi-chevron-right me-2"></i>Contact
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Contact Section -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="footer-section">
            <h5 class="footer-title mb-4">Contact Us</h5>
            <ul class="list-unstyled">
              <li class="mb-3 d-flex align-items-center">
                <i class="bi bi-geo-alt-fill me-3 fs-5"></i>
                <span>Sidi Ali chebeb, El Alia, Bizerte</span>
              </li>
              <li class="mb-3 d-flex align-items-center">
                <i class="bi bi-telephone-fill me-3 fs-5"></i>
                <span>58 689 537</span>
              </li>
              <li class="mb-3 d-flex align-items-center">
                <i class="bi bi-envelope-fill me-3 fs-5"></i>
                <a href="mailto:hedibenhassine95@gmail.com" class="footer-link">
                  info@myecommerce.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Social Media Section -->
        <div class="col-lg-2 col-md-6 mb-4">
          <div class="footer-section">
            <h5 class="footer-title mb-4">Follow Us</h5>
            <div class="social-links d-flex flex-wrap gap-3">
              <a href="#" class="social-icon" target="_blank">
                <i class="fab fa-facebook-f fs-5"></i>
              </a>
              <a href="#" class="social-icon" target="_blank">
                <i class="fab fa-twitter fs-5"></i>
              </a>
              <a href="#" class="social-icon" target="_blank">
                <i class="fab fa-instagram fs-5"></i>
              </a>
              <a href="#" class="social-icon" target="_blank">
                <i class="fab fa-linkedin-in fs-5"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright Section -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="footer-copyright text-center py-3 border-top border-secondary">
            <p class="mb-0">
              &copy; 2025 My Ecommerce | All rights reserved<br class="d-md-none" />
              <a href="mailto:hedibenhassine95@gmail.com" class="footer-link">
                Privacy Policy | Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(145deg, #1a1e21, #212529);
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
}

.footer-title {
  font-weight: 600;
  letter-spacing: 0.05em;
  position: relative;
  padding-bottom: 0.5rem;
}

.footer-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 2px;
  background: #007bff;
}

.footer-link {
  color: #dee2e6 !important;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  position: relative;
}

.footer-link:hover {
  color: #007bff !important;
  transform: translateX(5px);
}

.footer-link:hover::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  background: #007bff;
  animation: underlineSlide 0.3s ease;
}

@keyframes underlineSlide {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

.social-icon {
  width: 40px;
  height: 40px;
  border: 1px solid #495057;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: #007bff;
  border-color: #007bff;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.footer-text {
  line-height: 1.7;
  color: #adb5bd;
}

.footer-copyright {
  font-size: 0.9rem;
  color: #6c757d !important;
}

@media (max-width: 768px) {
  .footer-section {
    text-align: center;
  }

  .footer-title::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .footer-link {
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }
}
</style>
