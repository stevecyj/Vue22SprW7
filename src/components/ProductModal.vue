<template>
  <div
    id="productModal"
    ref="ProductModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="exampleModalLabel" class="modal-title">
            <span>{{ product.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6 vld-parent">
              <img class="img-fluid" :src="product.imageUrl" alt="" />
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{}}</span>
              <p>商品描述：{{ product.description }}</p>
              <p>商品內容：{{ product.content }}</p>
              <div v-if="product.price === product.origin_price" class="h5">
                {{ product.price }} 元
              </div>
              <div v-else>
                <del class="h6">原價 {{ product.origin_price }} 元</del>
                <div class="h5">現在只要 {{ product.price }} 元</div>
              </div>
              <div>
                <!-- 輸入框，產品數量 -->
                <div class="input-group">
                  <v-form v-slot="{ values, errors }" class="input-group">
                    <v-field
                      v-model="qty"
                      :class="{ 'is-invalid': errors['數量'] }"
                      class="form-control"
                      min="1"
                      max="20"
                      name="數量"
                      rules="between:1,20"
                      type="number"
                      @update:modelValue="values.數量 = Number(values.數量)"
                    />
                    <error-message class="invalid-feedback" name="數量"></error-message>
                    <button type="button" class="btn btn-primary" @click="addToCart">
                      加入購物車
                    </button>
                  </v-form>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BsModal from 'bootstrap/js/dist/modal';

export default {
  name: 'ProductModal',
  props: ['product'],
  data() {
    return {
      qty: 1,
      ProductModal: {},
      tempObj: {},
    };
  },

  watch: {
    product: {
      handler(newVal) {
        this.tempObj = JSON.parse(JSON.stringify(newVal));
      },
      deep: true,
    },
  },

  methods: {
    addToCart() {
      this.$emit('addToCart', this.tempObj.id, this.qty);
    },
  },

  mounted() {
    this.ProductModal = new BsModal(this.$refs.ProductModal);
    this.$refs.ProductModal.addEventListener('hidden.bs.modal', () => {
      this.$emit('clear-single-product');
      this.qty = 1;
    });
  },
};
</script>
