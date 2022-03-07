// 匯入 vee-validate 主套件
import * as veeValidate from 'vee-validate';

// 匯入 vee-validate 相關規則
import AllRules from '@vee-validate/rules';

// 匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n';

// 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import 'bootstrap';
import '@/assets/scss/index.scss';

import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue';
import router from './router';
import { date, currency } from './libs/filters';

// 定義驗證規則(eslint decide code block order)
Object.keys(AllRules).forEach((rule) => {
  veeValidate.defineRule(rule, AllRules[rule]);
});

// 設定 vee-validate 全域規則(eslint decide code block order)
veeValidate.configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true, // 調整為輸入字元立即進行驗證
});

// 設定預設語系(eslint decide code block order)
setLocale('zh_TW');

const app = createApp(App);
app.config.globalProperties.$filters = {
  date,
  currency,
};

app.use(router);
app.use(VueAxios, axios);

app.component('VForm', veeValidate.Form);
app.component('VField', veeValidate.Field);
app.component('ErrorMessage', veeValidate.ErrorMessage);
app.mount('#app');
