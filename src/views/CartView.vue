<template>
  <h2>購物車</h2>
  <div class="container">
    <!-- 產品Modal -->

    <!-- <product-modal :id="productId" ref="productModal" @add-cart="addToCart">
      </product-modal> -->
    <!-- 產品Modal -->

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
              {{ product.price }} 元
            </div>
            <div v-else>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
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
    <!-- 購物車列表 -->
    <div class="text-end">
      <button
        :class="{ disabled: this.cartData.carts?.length === 0 }"
        class="btn btn-outline-danger"
        type="button"
        @click="clearCarts"
      >
        清空購物車
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cartData: {}, // cart 是拿整包資料
      products: [],
      isLoadingItem: '',
    };
  },
  methods: {
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

    // 取得購物車資料
    getCart() {
      // this.isLoading = true;
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          console.log('cart', res);
          this.cartData = res.data.data;
          // this.isLoading = false;
        })
        .catch((err) => {
          // this.isLoading = false;
          // console.error(err.data.message);
          this.alertError(err);
        });
    },

    // 加入購物車
    addToCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty,
      };
      this.isLoadingItem = id;
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, {
          data,
        })
        .then(() => {
          // console.log('addToCart', res);
          // this.alertSuccess(res.data.message);
          this.getCart();
          // this.$refs.productModal.closeModal(); // 加入購物車後，關閉 modal
          this.isLoadingItem = '';
        })
        .catch((err) => {
          this.isLoadingItem = '';
          console.error(err);
          // this.alertError(err);
        });
    },

    // 清空購物車
    clearCarts() {
      // this.isLoading = true;
      this.$http
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
        .then((res) => {
          console.log('clearCarts', res);
          // this.alertSuccess(res.data.message);
          this.getCart();
          // this.isLoading = false;
        })
        .catch((err) => {
          // this.isLoading = false;
          console.error(err);
          // this.alertError(err.data.message);
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
