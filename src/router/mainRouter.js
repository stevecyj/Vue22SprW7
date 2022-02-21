import HomeView from '../views/HomeView.vue';

export default [
  {
    path: '/',
    name: 'FrontView',
    component: () => import(/* webpackChunkName: "FrontView" */ '../views/FrontView.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: HomeView,
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "DashBoard" */ '../views/DashBoard.vue'),
  },
];
