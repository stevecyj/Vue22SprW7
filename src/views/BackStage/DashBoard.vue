<template>
  <!-- 頂部導覽 -->
  <AdminNavbar></AdminNavbar>
  <ToastMessages></ToastMessages>
  <router-view v-if="checkSuccess"></router-view>
</template>

<script>
import AdminNavbar from '@/components/Navbar/AdminNavbar.vue';
import emitter from '@/libs/emitter'; // 使用 provide
import $httpMessageState from '@/libs/pushMessageState';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  name: 'DashBoard',
  components: {
    AdminNavbar,
    ToastMessages,
  },
  // 使用 provide
  provide() {
    return {
      emitter,
      $httpMessageState,
    };
  },
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
        const api = `${process.env.VUE_APP_API}/api/user/check`;
        this.$http
          .post(api)
          .then(() => {
            // console.log(res);
            this.checkSuccess = true;
          })
          .catch((err) => {
            console.error(err);
            // this.alertError(err.data.message);
            this.$router.push('/login');
          });
      } else {
        // alert('請先登入');
        this.$router.push('/login');
      }
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
