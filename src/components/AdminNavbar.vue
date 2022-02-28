<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">後台</a>
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
            <router-link class="nav-link" to="/">回到前台</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">後台產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupon">優惠券</router-link>
          </li>
        </ul>
      </div>
      <!-- 登出 -->
      <button type="button" class="btn btn-primary" @click.prevent="signout">登出</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AdminNavbar',

  methods: {
    // 登出
    signout() {
      document.cookie = 'hexToken=;expires=;';
      // alert('token 已清除');
      this.$router.push('/login');
    },
  },
};
</script>
