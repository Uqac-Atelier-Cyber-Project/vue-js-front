import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './components/LoginView.vue';
import RegisterView from './components/RegisterView.vue';
import HomeView from './components/HomeView.vue';

const routes = [
  { path: '/', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/home', component: HomeView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
