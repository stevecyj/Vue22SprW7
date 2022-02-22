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
      {
        path: 'products',
        name: 'Products',
        component: () => import(/* webpackChunkName: "Products" */ '../views/ProductsView.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import(/* webpackChunkName: "Cart" */ '../views/CartView.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "DashBoard" */ '../views/DashBoard.vue'),
  },
];
