import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home';
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      next();
    },
  },
  {
    path: '/milestone',
    name: 'Milestone',
    component: () => import(/* webpackChunkName: "milestone" */ '../views/Milestone.vue'),
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import(/* webpackChunkName: "setting" */ '../views/Setting.vue'),
  },
  {
    path: '/loginRedirect',
    name: 'LoginRedirect',
    component: () => import(/* webpackChunkName: "loginRedirect" */ '../views/LoginRedirect.vue'),
    beforeEnter: (to, from, next) => {
      if (to.query.code) {
        store.commit('authorization/setAuthCode', to.query.code);
        next('/loginRedirect');
      }
      next();
    },
  },
  {
    path: '/myPage',
    name: 'MyPage',
    component: () => import(/* webpackChunkName: "myPage" */ '../views/MyPage.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'PageNotFound',
    component: () => import(/* webpackChunkName: "pageNotFound" */ '../views/PageNotFound'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
