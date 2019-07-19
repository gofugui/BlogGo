import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'router-view',
      component: require('@/layouts/RouterLayout').default,
      redirect: '/router-view/editor',
      children: [
        {
          path: '/router-view/editor',
          name: 'editor',
          component: require('@/pages/editor').default,
        },
        {
          path: '/router-view/upload',
          name: 'upload',
          component: require('@/pages/upload').default,
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
