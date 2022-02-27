<template>
  <h2>單一產品</h2>
  <div class="container"></div>
</template>

<script>
export default {
  data() {
    return {
      product: [],
    };
  },
  methods: {
    getProduct() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          console.log(res);
          this.products = res.data.products;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
