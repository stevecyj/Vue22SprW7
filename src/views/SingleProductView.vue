<template>
  <!-- vue-loading-overlay start -->
  <div class="vld-parent">
    <Loading v-model:active="isLoading" :can-cancel="true" :is-full-page="fullPage">
      <Spinner></Spinner>
    </Loading>
  </div>
  <!-- vue-loading-overlay end -->
  <h2>單一產品</h2>
  <div class="container">
    <div class="row py-3">
      <!-- left side -->
      <h5 class="bg-dark text-white">{{ product.title }}</h5>
      <div class="col-md-6">
        <h2>單一產品細節</h2>
        <!-- template,搭配 v-if -->
        <template v-if="product.id">
          <div class="card mb-3">
            <img :src="product.imageUrl" class="card-img-top primary-image" alt="主圖" />
          </div>
          <span v-for="imgUrl in product.imagesUrl" :key="imgUrl">
            <img :src="imgUrl" class="images m-2" alt="images" />
          </span>
        </template>
        <!-- <template v-else>
          <p class="text-secondary">請選擇一個商品查看</p>
        </template> -->
      </div>
      <!-- right side -->
      <div class="col-md-6">
        <h2>單一產品細節</h2>
        <!-- template,搭配 v-if -->
        <template v-if="product.id">
          <div class="card mb-3">
            <!-- <img :src="product.imageUrl" class="card-img-top primary-image" alt="主圖" /> -->
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

              <div class="input-group">
                <input v-model="qty" type="number" class="form-control" min="1" />
                <button
                  type="button"
                  class="btn btn-primary"
                  :disabled="isLoadingItem === product.id"
                  @click="addToCart(product.id, qty)"
                >
                  <span v-show="isLoadingItem === product.id"
                    ><i class="fas fa-spinner fa-pulse"></i
                  ></span>
                  加入購物車
                </button>
              </div>
            </div>
          </div>

          <!-- <span v-for="imgUrl in product.imagesUrl" :key="imgUrl">
            <img :src="imgUrl" class="images m-2" alt="images" />
          </span> -->
        </template>
        <template v-else>
          <!-- <p class="text-secondary">請選擇一個商品查看</p> -->
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import swalMixins from '@/mixins/swalMixins';
import emitter from '@/libs/emitter';

// vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Spinner from '@/components/LoadingOverlay/Spinner.vue';

export default {
  name: 'SingleProductView',
  components: {
    Loading,
    Spinner,
  },
  data() {
    return {
      qty: 1,
      product: [],
      isLoadingItem: '', // bootstrap loading
      isLoading: false, // vue-overlay loading
      fullPage: true, // vue-overlay fullPage
    };
  },
  mixins: [swalMixins],
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

    // 加入購物車
    addToCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty,
      };
      // console.log(data);
      // this.isLoading = true;
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, {
          data,
        })
        .then((res) => {
          // console.log('addToCart', res);
          emitter.emit('get-cart');
          // this.getCart();
          this.isLoading = false;
          this.alertSuccess(res.data.message);
        })
        .catch((err) => {
          this.isLoading = false;
          // console.error(err.data.message);
          this.alertError(err);
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
