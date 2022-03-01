<template>
  <h2>單一產品</h2>
  <div class="container">
    <div class="row py-3">
      <!-- right side -->
      <div class="col-md-6">
        <h2>單一產品細節</h2>
        <!-- template,搭配 v-if -->
        <template v-if="product.id">
          <div class="card mb-3">
            <img :src="product.imageUrl" class="card-img-top primary-image" alt="主圖" />
            <div class="card-body">
              <h5 class="card-title">
                {{ product.title }}
                <span class="badge bg-primary ms-2">{{ product.category }}</span>
              </h5>
              <p class="card-text">商品描述：{{ product.description }}</p>
              <p class="card-text">商品內容：{{ product.content }}</p>
              <div class="d-flex">
                <p class="card-text me-2">{{ product.price }}</p>
                <p class="card-text text-secondary">
                  <del>{{ product.origin_price }}</del>
                </p>
                元 /{{ product.unit }}
              </div>
            </div>
          </div>
          <span v-for="imgUrl in product.imagesUrl" :key="imgUrl">
            <img :src="imgUrl" class="images m-2" alt="images" />
          </span>
        </template>
        <template v-else>
          <!-- <p class="text-secondary">請選擇一個商品查看</p> -->
        </template>
      </div>
    </div>
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
<style scoped>
img {
  object-fit: contain;
  max-width: 100%;
}

.primary-image {
  height: 300px;
}

.images {
  height: 150px;
}
</style>
