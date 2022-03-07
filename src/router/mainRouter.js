export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "LoginView" */ '../views/LoginView.vue'),
  },
  {
    path: '/',
    name: 'FrontView',
    component: () =>
      import(/* webpackChunkName: "FrontView" */ '../views/FrontStage/FrontView.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () =>
          import(/* webpackChunkName: "HomeView" */ '../views/FrontStage/HomeView.vue'),
      },
      {
        path: 'products',
        name: 'ClientProducts',
        component: () =>
          import(/* webpackChunkName: "Products" */ '../views/FrontStage/ProductsView.vue'),
      },
      {
        path: 'product/:id',
        name: 'ClientProduct',
        component: () =>
          import(
            /* webpackChunkName: "SingleProduct" */ '../views/FrontStage/SingleProductView.vue'
          ),
      },
      {
        path: 'cart',
        name: 'ClientCart',
        component: () => import(/* webpackChunkName: "Cart" */ '../views/FrontStage/CartView.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'DashBoard',
    component: () => import(/* webpackChunkName: "DashBoard" */ '../views/BackStage/DashBoard.vue'),
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: () =>
          import(/* webpackChunkName: "AdminProducts" */ '../views/BackStage/AdminProducts.vue'),
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () =>
          import(/* webpackChunkName: "AdminOrders" */ '../views/BackStage/Orders.vue'),
      },
      {
        path: 'coupon',
        name: 'AdminCoupon',
        component: () =>
          import(/* webpackChunkName: "AdminCoupon" */ '../views/BackStage/AdminCoupon.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue'),
  },
];
