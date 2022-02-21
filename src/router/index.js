import { createRouter, createWebHashHistory } from 'vue-router';
// import Home from '../views/Home.vue';
import mainRouter from './mainRouter';

const routes = [...mainRouter];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
