import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './components/LoginView.vue';
import RegisterView from './components/RegisterView.vue';
import HomeView from './components/HomeView.vue';
import AnalyseView from './components/AnalyseView.vue';
import HistoryView from './components/HistoryView.vue';
import Profile from './components/ProfileView.vue';

const routes = [
  { path: '/', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/home', component: HomeView },
  { path: '/analyse', component: AnalyseView },
  { path: '/history', component: HistoryView },
  { path: '/profile', component: Profile},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
