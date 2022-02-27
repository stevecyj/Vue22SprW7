<template>
  <h2>產品列表</h2>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      product: {
        name: '',
        price: 0,
        description: '',
      },
    };
  },
  methods: {
    getProducts() {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`).then((res) => {
        // this.products = res.data;
        console.log(res);
      });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
