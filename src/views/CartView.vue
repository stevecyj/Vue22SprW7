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
      <!-- test swal button -->
      <!-- <button
        :class="{ disabled: this.cartData.carts?.length === 0 }"
        class="btn btn-outline-info"
        type="button"
        @click="alertSuccess('購物車已清空')"
      >
        swal
      </button> -->
      <!-- test loading button -->
      <!-- <button type="button" @click="testLoading">loading</button> -->
      <!-- vue-loading-overlay start -->
      <div class="vld-parent">
        <Loading v-model:active="isLoading" :can-cancel="true" :is-full-page="fullPage">
          <Spinner></Spinner>
        </Loading>
      </div>
      <!-- vue-loading-overlay end -->
    </div>
    <!-- cart list start -->
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cartData.carts">
          <tr v-for="item in cartData.carts" :key="item.id">
            <td>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="removeCartItem(item.id)"
              >
                <!-- <i v-show="isLoadingItem === item.id" class="fas fa-spinner fa-pulse"></i> -->
                x
              </button>
            </td>
            <td>
              {{ item.product.title }}
              <div v-if="item.coupon" class="text-success">已套用優惠券</div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <!-- 要相信使用者一定會亂填，改用 select -->
                  <!-- <input class="form-control" min="1" type="number" v-model="item.qty" /> -->
                  <select
                    id=""
                    v-model="item.qty"
                    :disabled="isLoadingItem === item.id"
                    class="form-select"
                    @change="updateCartItem(item)"
                  >
                    <!-- 上一個 commit 的做法，qty：當前在購物車的數量，num：迴圈的值，2個值一樣就選這個值，也可以綁在 select 的 tag 上-->
                    <option v-for="num in 20" :key="`${num}${item.id}`" :value="num">
                      {{ num }}
                    </option>
                  </select>
                  <span id="basic-addon2" class="input-group-text">{{ item.product.unit }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <small v-if="cartData.final_total !== cartData.total" class="text-success"
                >折扣價：</small
              >
              {{ cartData.final_total }} 元
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td class="text-end" colspan="3">總計</td>
          <td class="text-end">{{ cartData.total }} 元</td>
        </tr>
        <tr>
          <td
            v-if="cartData.final_total !== cartData.total"
            class="text-end text-success"
            colspan="3"
          >
            折扣價
          </td>
          <td v-if="cartData.final_total !== cartData.total" class="text-end text-success">
            {{ cartData.final_total }}
          </td>
        </tr>
      </tfoot>
    </table>
    <!-- csrt list end -->
  </div>
</template>

<script>
import swalMixins from '@/mixins/swalMixins';

// vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Spinner from '@/components/LoadingOverlay/Spinner.vue';

export default {
  name: 'CartView',
  components: {
    Loading,
    Spinner,
  },
  data() {
    return {
      cartData: {
        carts: [],
      }, // cart 是拿整包資料
      products: [],
      isLoadingItem: '', // bootstrap loading
      isLoading: false, // vue-overlay loading
      fullPage: true, // vue-overlay fullPage
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

    // 移除購物車
    removeCartItem(id) {
      this.isLoading = true;
      console.log(`item id: ${id}`, `isLoadingItem: ${this.isLoadingItem}`);
      this.$http
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then((res) => {
          // console.log('removeCartItem', res);
          this.alertSuccess(res.data.message);
          this.getCart();
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          // console.error(err);
          this.alertError(err.data.message);
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

    // test vue-loading-overlay
    testLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
