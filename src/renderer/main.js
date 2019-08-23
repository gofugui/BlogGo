import Vue from 'vue';
import axios from 'axios';
import 'iview/dist/styles/iview.css';
import {
  Icon, Button, Layout, Header, Modal, Input, Badge,
  Poptip, Tag, Split, Message,
} from 'iview';
import App from './App';
import router from './router';
import store from './store';

import './assets/font1/css/columns.css';
import './assets/font2/iconfont.css';
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.component('Button', Button);
Vue.component('Icon', Icon);
Vue.component('Layout', Layout);
Vue.component('Modal', Modal);
Vue.component('Header', Header);

Vue.component('Input', Input);

Vue.component('Poptip', Poptip);
Vue.component('Badge', Badge);
Vue.component('Tag', Tag);
Vue.component('Split', Split);
Vue.prototype.$Message = Message;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',

}).$mount('#app');

