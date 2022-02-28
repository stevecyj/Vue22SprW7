export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "LoginView" */ '../views/LoginView.vue'),
  },
  {
    path: '/',
    name: 'FrontView',
    component: () => import(/* webpackChunkName: "FrontView" */ '../views/FrontView.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "HomeView" */ '../views/HomeView.vue'),
      },
      {
        path: 'products',
        name: 'ClientProducts',
        component: () => import(/* webpackChunkName: "Products" */ '../views/ProductsView.vue'),
      },
      {
        path: 'product/:id',
        name: 'ClientProduct',
        component: () =>
          import(/* webpackChunkName: "SingleProduct" */ '../views/SingleProductView.vue'),
      },
      {
        path: 'cart',
        name: 'ClientCart',
        component: () => import(/* webpackChunkName: "Cart" */ '../views/CartView.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'DashBoard',
    component: () => import(/* webpackChunkName: "DashBoard" */ '../views/DashBoard.vue'),
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: () =>
          import(/* webpackChunkName: "AdminProducts" */ '../views/AdminProducts.vue'),
      },
      {
        path: 'coupon',
        name: 'AdminCoupon',
        component: () => import(/* webpackChunkName: "AdminCoupon" */ '../views/AdminCoupon.vue'),
      },
    ],
  },
];
