import Vue from 'vue';
import axios from 'axios';
import 'iview/dist/styles/iview.css';
import { Icon, Button, Form, FormItem, Dropdown, DropdownMenu, DropdownItem, Input } from 'iview';
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import Device from '../tools/device';

import App from './App';
import router from './router';
import store from './store';
import './assets/font/css/fontello.css';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.component('Button', Button);
Vue.component('Icon', Icon);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Dropdown', Dropdown);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.component('Input', Input);
Vue.use(Antd);
Vue.prototype.Device = Device;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',

}).$mount('#app');
