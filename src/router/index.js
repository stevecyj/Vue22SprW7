import { createRouter, createWebHashHistory } from 'vue-router';
// import Home from '../views/Home.vue';
import mainRouter from './mainRouter';

const routes = [...mainRouter];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active', // bs的active 樣式，預設是active，在巢狀內的路由都會加上效果
});

export default router;
