<template>
  <h2>單一產品</h2>
  <div class="container">
    {{ product }}
  </div>
</template>

<script>
export default {
  name: 'SingleProductView',
  data() {
    return {
      product: [],
    };
  },
  methods: {
    getProduct() {
      // console.log(this.$route.params.id);
      const { id } = this.$route.params;
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then((res) => {
          // console.log(res);
          this.product = res.data.product;
        })
        .catch(() => {
          // console.log(err);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
