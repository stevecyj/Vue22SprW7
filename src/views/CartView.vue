<template>
  <h3>購物車</h3>
  <div class="container">
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
    </div>
    <!-- vue-loading-overlay start -->
    <div class="vld-parent">
      <Loading v-model:active="isLoading" :can-cancel="true" :is-full-page="fullPage">
        <Spinner></Spinner>
      </Loading>
    </div>
    <!-- vue-loading-overlay end -->
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
                type="button"
                class="btn btn-outline-danger btn-sm"
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
              {{ item.product.price * item.qty }} 元
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td class="text-end" colspan="3">總計</td>
          <td class="text-end">{{ cartData.final_total }} 元</td>
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
    <!-- cart list end -->
    <div class="my-5 row justify-content-center">
      <!-- form start -->
      <v-form ref="form" v-slot="{ errors }" class="col-md-6" @submit="submitOrder">
        <!-- test error message -->
        <!-- <span style="color: red">{{ errors }}</span> -->
        <div class="mb-3">
          <label class="form-label" for="email">Email</label>
          <v-field
            id="email"
            v-model="form.user.email"
            :class="{ 'is-invalid': errors['email'] }"
            class="form-control"
            name="email"
            placeholder="請輸入 Email"
            rules="email|required"
            type="email"
          ></v-field>
          <error-message class="invalid-feedback" name="email"></error-message>
        </div>

        <div class="mb-3">
          <label class="form-label" for="name">收件人姓名</label>
          <v-field
            id="name"
            v-model="form.user.name"
            :class="{ 'is-invalid': errors['姓名'] }"
            class="form-control"
            name="姓名"
            placeholder="請輸入姓名"
            rules="required"
            type="text"
          ></v-field>
          <error-message class="invalid-feedback" name="姓名"></error-message>
        </div>

        <div class="mb-3">
          <label class="form-label" for="tel">收件人電話</label>
          <v-field
            id="tel"
            v-model="form.user.tel"
            :class="{ 'is-invalid': errors['phone'] }"
            :rules="isPhone"
            class="form-control"
            name="phone"
            placeholder="請輸入手機(手機09XXXXXXXX，10位數字)"
            type="tel"
          ></v-field>
          <error-message class="invalid-feedback" name="phone"></error-message>
        </div>

        <div class="mb-3">
          <label class="form-label" for="address">收件人地址</label>
          <v-field
            id="address"
            v-model="form.user.address"
            :class="{ 'is-invalid': errors['地址'] }"
            class="form-control"
            name="地址"
            placeholder="請輸入地址"
            rules="required"
            type="text"
          ></v-field>
          <error-message class="invalid-feedback" name="地址"></error-message>
        </div>

        <div class="mb-3">
          <label class="form-label" for="message">留言</label>
          <v-field
            id="message"
            v-model="form.message"
            as="textarea"
            class="form-control"
            cols="30"
            name="留言"
            rows="10"
          ></v-field>
        </div>
        <div class="text-end">
          <!-- {{Object.keys(errors).length}} -->
          <!-- 逆天可選運算子 -->
          <button
            :class="{
              disabled: this.cartData.carts?.length === 0 || Object.keys(errors).length !== 0,
            }"
            class="btn btn-danger"
            type="submit"
          >
            送出訂單
          </button>
        </div>
      </v-form>
      <!-- form end -->
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
      productId: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
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
          emitter.emit('get-cart');
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

    // 更新購物車, PUT
    updateCartItem(item) {
      // const apiUrl = `/v2/api/${apiPath}/cart/${item.id}`; // 這裡從整包物件裡拿 id(cart id)
      const data = {
        product_id: item.product_id, // product id
        qty: item.qty,
      };
      this.isLoadingItem = item.id;
      this.$http
        .put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, {
          data,
        })
        .then((res) => {
          // console.log('updateCartItem', item.id, res.data.data);
          this.alertSuccess(res.data.message);
          this.getCart();
          this.isLoadingItem = '';
        })
        .catch((err) => {
          this.isLoadingItem = '';
          // console.error(err.data.message);
          this.alertError(err.data.message);
        });
    },

    // 清空購物車
    clearCarts() {
      this.isLoading = true;
      this.$http
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
        .then((res) => {
          console.log('clearCarts', res);
          this.alertSuccess(res.data.message);
          emitter.emit('get-cart');
          this.getCart();
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          console.error(err);
          this.alertError(err.data.message);
        });
    },

    // 送出訂單
    submitOrder() {
      const data = this.form;
      this.isLoading = true;
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`, {
          data,
        })
        .then((res) => {
          // console.log('submitOrder', res);
          this.$refs.form.resetForm();
          this.alertSuccess(res.data.message);
          emitter.emit('get-cart');
          this.getCart();
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          // console.error(err.data.message);
          this.alertError(err.data.message);
        });
    },

    // validate rule for phone
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '請填寫正確的手機號碼';
    },

    // test vue-loading-overlay
    // testLoading() {
    //   this.isLoading = true;
    //   setTimeout(() => {
    //     this.isLoading = false;
    //   }, 3000);
    // },
  },
  mounted() {
    this.getCart();
  },
};
</script>
