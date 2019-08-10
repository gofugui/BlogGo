import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'router-view',
      component: require('@/pages/postlist').default,

      children: [
        {
          path: '/router-view/editor/:id/:time',
          name: 'editor',
          component: require('@/pages/editor').default,
        }, {
          path: '/router-view/setting',
          name: 'setting',
          component: require('@/pages/setting').default,
        },

      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
