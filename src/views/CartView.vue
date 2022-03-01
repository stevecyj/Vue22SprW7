<template>
  <h3>購物車</h3>
  <div class="container">
    <div class="text-end">
      <button
        :class="{ disabled: this.cartData.carts?.length === 0 }"
        class="btn btn-outline-danger"
        type="button"
        @click="clearCarts"
      >
        清空購物車
      </button>
      <!-- test button -->
      <!-- <button
        :class="{ disabled: this.cartData.carts?.length === 0 }"
        class="btn btn-outline-info"
        type="button"
        @click="alertSuccess('購物車已清空')"
      >
        swal
      </button> -->
    </div>
  </div>
</template>

<script>
import swalMixins from '@/mixins/swalMixins';

export default {
  name: 'CartView',
  data() {
    return {
      cartData: {
        carts: [],
      }, // cart 是拿整包資料
      products: [],
      isLoadingItem: '',
    };
  },
  mixins: [swalMixins],
  methods: {
    getProducts() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          // console.log(res);
          this.isLoading = false;
          this.products = res.data.products;
        })
        .catch((err) => {
          this.isLoading = false;
          console.error(err.response);
          // this.alertError(err.data.message);
        });
    },

    // 取得購物車資料
    getCart() {
      // this.isLoading = true;
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          // console.log('cart', res);
          this.cartData = res.data.data;
          // this.isLoading = false;
        })
        .catch((err) => {
          // this.isLoading = false;
          console.error(err.data.message);
          // this.alertError(err);
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
          // console
          // console.log('addToCart', res);
          this.getCart();
        })
        .catch((err) => {
          // this.isLoading = false;
          // console.error(err.data.message);
          this.alertError(err);
        });
    },

    // 清空購物車
    clearCarts() {
      this.$http
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then(() => {
          // console.log('clearCarts', res);
          this.getCart();
        })
        .catch((err) => {
          // this.isLoading = false;
          // console.error(err.data.message);
          this.alertError(err);
        });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
