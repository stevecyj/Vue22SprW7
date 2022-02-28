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
    </div>
  </nav>
  <router-view v-if="checkSuccess"></router-view>
</template>

<script>
export default {
  name: 'DashBoard',
  data() {
    return {
      checkSuccess: false,
    };
  },
  methods: {
    checkLogin() {
      // 取得 Token (Token 僅需設定一次)
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (token) {
        this.$http.defaults.headers.common.Authorization = token;
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/user/check`;
        this.$http
          .post(api)
          .then((res) => {
            console.log(res);
            this.checkSuccess = true;
          })
          .catch((err) => {
            console.error(err.data.message);
            // this.alertError(err.data.message);
            this.$router.push('/login');
          });
      } else {
        alert('請先登入');
        this.$router.push('/login');
      }
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
