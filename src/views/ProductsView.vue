<template>
  <h2>產品列表</h2>
  <!-- card -->
  <div class="container">
    <!-- row 決定內層的數量 -->
    <div class="row row-cols-1 row-cols-lg-4 g-3">
      <!-- 內層不定義寬度 -->
      <div v-for="product in products" :key="product.id" class="col">
        <div class="card h-100" style="">
          <img :src="product.imageUrl" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  mounted() {
    this.getProducts();
  },
  methods: {
    getProducts() {
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
};
</script>
