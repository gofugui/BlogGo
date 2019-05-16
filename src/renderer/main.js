import Vue from 'vue';
import axios from 'axios';
import 'iview/dist/styles/iview.css';
import { Icon, Button } from 'iview';
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import App from './App';
import router from './router';
import store from './store';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.component('Button', Button);
Vue.component('Icon', Icon);
Vue.use(Antd);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
