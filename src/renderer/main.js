import Vue from 'vue';
import axios from 'axios';
import 'iview/dist/styles/iview.css';
import { Icon, Button, Layout, Header, Content, Dropdown, DropdownMenu, DropdownItem, Input, Poptip, Tag, Split, Message } from 'iview';
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
Vue.component('Layout', Layout);
Vue.component('Content', Content);
Vue.component('Header', Header);

Vue.component('Dropdown', Dropdown);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.component('Poptip', Poptip);
Vue.component('Input', Input);
Vue.component('Tag', Tag);
Vue.component('Split', Split);
Vue.prototype.$Message = Message;

Vue.prototype.Device = Device;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',

}).$mount('#app');

