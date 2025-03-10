import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './components/LoginView.vue';
import RegisterView from './components/RegisterView.vue';
import HomeView from './components/HomeView.vue';
import AnalyseView from './components/AnalyseView.vue';
import HistoryView from './components/HistoryView.vue';
import Profile from './components/ProfileView.vue';

const routes = [
  { path: '/', component: LoginView, props: true },
  { path: '/register', component: RegisterView, props: true },
  { path: '/home', component: HomeView, props: true },
  { path: '/analyse', component: AnalyseView, props: true },
  { path: '/history', component: HistoryView, props: true },
  { path: '/profile', component: Profile, props: true},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
