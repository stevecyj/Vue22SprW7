<template>
  <h2>產品列表</h2>
  <div class="container">
    <!-- 產品 check more Modal -->
    <ProductModal
      ref="checkMore"
      :product="product"
      @add-to-cart="addToCart"
      @clear-single-product="clearSingleProduct"
    ></ProductModal>
    <!-- 產品 check more Modal -->

    <!-- vue-loading-overlay start -->
    <div class="vld-parent">
      <Loading v-model:active="isLoading" :can-cancel="true" :is-full-page="fullPage">
        <Spinner></Spinner>
      </Loading>
    </div>
    <!-- vue-loading-overlay end -->

    <table class="table align-middle">
      <thead>
        <!-- render product list -->
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td style="width: 200px">
            <!-- 背景圖 -->
            <div
              :style="{ backgroundImage: `url(${product.imageUrl})` }"
              style="height: 100px; background-size: cover; background-position: center"
            ></div>
          </td>
          <td>{{ product.title }}</td>
          <td>
            <div v-if="product.price === product.origin_price" class="h5">
              {{ $filters.currency(product.price) }} 元
            </div>
            <div v-else>
              <del class="h6">原價 {{ $filters.currency(product.origin_price) }} 元</del>
              <div class="h5">現在只要 {{ $filters.currency(product.price) }} 元</div>
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="openProductModal(product.id)"
              >
                <!-- only use for openProductModal -->
                <!-- <i class="fas fa-spinner fa-pulse"></i> -->
                查看更多
              </button>
              <button
                :disabled="isLoadingItem === product.id"
                class="btn btn-outline-danger"
                type="button"
                @click="addToCart(product.id)"
              >
                <div
                  v-show="isLoadingItem === product.id"
                  class="spinner-grow spinner-grow-sm"
                ></div>
                <!-- <i class="fas fa-spinner fa-pulse"></i> -->
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import swalMixins from '@/mixins/swalMixins';

import emitter from '@/libs/emitter';
import ProductModal from '@/components/ProductModal.vue';

// vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Spinner from '@/components/LoadingOverlay/Spinner.vue';

export default {
  name: 'ProductsView',
  components: {
    ProductModal,
    Loading,
    Spinner,
  },
  data() {
    return {
      isLoading: false, // vue-overlay loading
      fullPage: true, // vue-overlay fullPage
      cartData: {}, // cart 是拿整包資料
      products: [],
      product: {}, // 單一產品
      productId: '',
      ProductModal: '',
      isLoadingItem: '',
      qty: '',
    };
  },
  mixins: [swalMixins],
  methods: {
    // 開啟查看更多
    openProductModal(id) {
      // console.log(id);
      this.productId = id;
      this.getSingleProduct();
      this.openModal();
    },

    getProducts() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`, {})
        .then((res) => {
          // console.log(res);
          this.isLoading = false;
          this.products = res.data.products;
        })
        .catch((err) => {
          this.isLoading = false;
          // console.error(err.response);
          this.alertError(err.data.message);
        });
    },

    // 取得單一產品資料
    getSingleProduct() {
      this.isLoading = true;
      // api for 取得單一品項資料
      // const apiUrl = `/v2/api/${apiPath}/product/${this.id}`;

      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.productId}`)
        .then((res) => {
          // console.log(res);
          this.product = res.data.product;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          console.error(err.response);
        });
    },

    // 取得購物車資料
    getCart() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          // console.log('cart', res);
          this.cartData = res.data.data;
        })
        .catch((err) => {
          console.error(err.data.message);
          // this.alertError(err);
        });
    },

    // 加入購物車
    addToCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty: Number(qty), // ✨✨ 確認 qty 是數字，api 有 check 型別
      };
      this.isLoading = true;
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, {
          data,
        })
        .then((res) => {
          // console.log('addToCart', res);
          this.isLoading = false;
          this.getCart();
          emitter.emit('get-cart');
          this.$refs.checkMore.ProductModal.hide(); // 加入購物車後，關閉 modal
          return res;
        })
        .then((res) => {
          // console.log(res);
          this.alertSuccess(res.data.message);
        })
        .catch((err) => {
          this.isLoading = false;
          console.error(err);
          this.alertError(err);
        });
    },

    // 清除 modal 單筆購物車資料
    clearSingleProduct() {
      // console.log('*** clearSingleProduct ***');
      this.product = {};
    },

    // open modal
    openModal() {
      // console.log('*** show check more modal now ***');
      this.$refs.checkMore.ProductModal.show();
    },

    // test emit
    testEmit(id, qty) {
      console.log('testEmit', id, qty);
      this.isLoading = true;
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
