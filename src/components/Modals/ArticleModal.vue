<template>
  <div
    id="productModal"
    ref="modal"
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
            <span v-if="isNew">新增貼文</span>
            <span v-else>編輯貼文</span>
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
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  v-model="tempArticle.title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  id="image"
                  v-model="tempArticle.imageUrl"
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <div class="mb-3">
                <label for="author" class="form-label">作者</label>
                <input
                  id="author"
                  v-model="tempArticle.author"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="mb-3">
                <label for="create_at">文章建立日期</label>
                <input id="create_at" v-model="create_at" type="date" class="form-control" />
              </div>
            </div>
            <div class="col-sm-8">
              <label for="tag" class="form-label">標籤</label>
              <div class="row gx-1 mb-3">
                <div v-for="(label, key) in tempArticle.tag" :key="key" class="col-md-2 mb-1">
                  <div class="input-group input-group-sm">
                    <input
                      id="tag"
                      v-model="tempArticle.tag[key]"
                      type="text"
                      class="form-control form-control"
                      placeholder="請輸入標籤"
                    />
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="tempArticle.tag.splice(key, 1)"
                    >
                      <i class="bi bi-x"></i>
                    </button>
                  </div>
                </div>
                <div
                  v-if="tempArticle.tag[tempArticle.tag.length - 1] || !tempArticle.tag.length"
                  class="col-md-2 mb-1"
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempArticle.tag.push('')"
                  >
                    新增標籤
                  </button>
                </div>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">文章描述</label>
                <textarea
                  id="description"
                  v-model="tempArticle.description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入文章描述"
                ></textarea>
              </div>
              <div class="mb-3">
                <ckeditor
                  v-model="tempArticle.content"
                  :editor="editor"
                  :config="editorConfig"
                ></ckeditor>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="isPublic"
                    v-model="tempArticle.isPublic"
                    class="form-check-input"
                    type="checkbox"
                  />
                  <label class="form-check-label" for="isPublic"> 是否公開 </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-article', tempArticle)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  props: {
    article: {
      type: Object,
      default() {
        return {};
      },
    },
    isNew: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      status: {},
      modal: '',
      tempArticle: {
        tag: [''],
        isPublic: false,
        content: '',
      },
      tt: {
        tag: [''],
        content: '',
      },
      create_at: 0,
      // 參考：https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs-v3.html#editor
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'bold', 'italic', '|', 'link'],
      },
      editorData: '',
    };
  },
  mixins: [modalMixin],
  watch: {
    article() {
      this.tempArticle = {
        ...this.article,
        tag: this.article.tag || [],
        isPublic: this.article.isPublic || false,
      };
      [this.create_at] = new Date(this.tempArticle.create_at * 1000).toISOString().split('T');
    },
    create_at() {
      this.tempArticle.create_at = Math.floor(new Date(this.create_at) / 1000);
    },
  },
  methods: {},
};
</script>

<style>
.ck-editor__editable_inline {
  min-height: 300px;
}
</style>
