import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import LoadingComp from '@/components/LoadingComp';

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    component: defineAsyncComponent({
      loader: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      delay: 3000,
      loadingComponent: LoadingComp,
    }),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    // component: defineAsyncComponent({
    //   loader: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    //   delay: 30000,
    //   loadingComponent: LoadingComp,
    // }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
