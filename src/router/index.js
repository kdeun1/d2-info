import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home';
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/milestone',
    name: 'Milestone',
    component: () => import(/* webpackChunkName: "milestone" */ '../views/Milestone.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
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
