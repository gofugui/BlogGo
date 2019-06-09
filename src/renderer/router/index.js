import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu-view',
      component: require('@/layouts/MenuView').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
