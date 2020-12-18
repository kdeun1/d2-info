import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import LoadingComp from '@/components/LoadingComp';
import Home from '@/views/Home';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/milestone',
    name: 'Milestone',
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    component: defineAsyncComponent({
      loader: () => import(/* webpackChunkName: "milestone" */ '../views/Milestone.vue'),
      delay: 3000,
      loadingComponent: LoadingComp,
    }),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
