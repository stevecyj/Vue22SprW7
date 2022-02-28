<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">前台名稱</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">購物車</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">回到後台</router-link>
          </li>
        </ul>
      </div>
      <!-- 結帳 button, 顯示數量 -->
      <button type="button" class="btn btn-primary">
        結帳
        <span class="badge rounded-pill bg-danger">{{ cartData.carts?.length }}</span>
      </button>
    </div>
  </nav>
</template>
<script>
import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      cartData: {
        carts: [],
      }, // cart 是拿整包資料
    };
  },
  methods: {
    // 取得購物車資料
    getCart() {
      // this.isLoading = true;
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          // console.log('cart', res);
          this.cartData = res.data.data;
          // this.isLoading = false;
          // mitt, get-cart
          emitter.emit('get-cart');
        })
        .catch(() => {
          // this.isLoading = false;
          // console.error(err.data.message);
          // this.alertError(err);
        });
    },
  },
  mounted() {
    this.getCart();

    // 監聽購物車資料，重新取得購物車
    emitter.on('get-cart', () => {
      this.getCart();
    });
  },
};
</script>
