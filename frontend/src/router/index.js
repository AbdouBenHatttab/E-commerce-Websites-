import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/HomePage.vue';
import Login from '@/components/LoginPage.vue';
import Register from '@/components/RegisterPage.vue';
import ContactUs from '@/components/ContactUs.vue';
// Admin pages
import AdminDashboard from '@/components/admin/AdminDashboard.vue';
import AdminProfile from '@/components/admin/AdminProfile.vue';
import AdminUsers from '@/components/admin/AdminUsers.vue';
import AdminProducts from '@/components/admin/AdminProducts.vue';
import ContactMessages from '@/components/admin/ContactMessages.vue';
// User pages
import UserDashboard from '@/components/user/UserDashboard.vue';
import UserProfile from '@/components/user/UserProfile.vue';
import ProductList from '@/components/user/ProductList.vue';
import UserCart from '@/components/user/UserCart.vue';
import ProductDetail from '@/components/user/ProductDetail.vue';
import AuthService from '@/services/AuthService';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/contact', name: 'ContactUs', component: ContactUs },
  // Admin routes
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/admin/profile',
    name: 'AdminProfile',
    component: AdminProfile,
    meta: { requiresAuth: true, role: 'ROLE_ADMIN' },
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers,
    meta: { requiresAuth: true, role: 'ROLE_ADMIN' },
  },
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: AdminProducts,
    meta: { requiresAuth: true, role: 'ROLE_ADMIN' },
  },
  {
    path: '/admin/messages',
    name: 'Messages',
    component: ContactMessages,
    meta: { requiresAuth: true, role: 'ROLE_ADMIN' },
  },
  // User routes
  {
    path: '/user/dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true, requiresUser: true },
  },
  {
    path: '/user/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true, role: 'ROLE_USER' },
  },
  {
    path: '/user/products',
    name: 'ProductList',
    component: ProductList,
    meta: { requiresAuth: true, role: 'ROLE_USER' },
  },
  {
    path: '/user/cart',
    name: 'UserCart',
    component: UserCart,
    meta: { requiresAuth: true, role: 'ROLE_USER' },
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// List of public pages (no authentication required)
// const publicPages = ['/', '/login', '/register'];

router.beforeEach((to, from, next) => {
  const user = AuthService.getCurrentUser();
  const isAuthenticated = !!user;
  const isAdmin = user && user.role === 'ROLE_ADMIN';
  const isUser = user && user.role === 'ROLE_USER';

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      return next({ name: 'Login' });
    }
    if (to.matched.some((record) => record.meta.requiresAdmin) && !isAdmin) {
      return next({ name: 'Home' });
    }
    if (to.matched.some((record) => record.meta.requiresUser) && !isUser) {
      return next({ name: 'Home' });
    }
  }
  next();
});

export default router;
