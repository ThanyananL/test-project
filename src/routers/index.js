import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/css-test',
  },
  {
    path: '/css-test',
    name: 'CssTest',
    component: () => import('../components/css-test/CssTest.vue'),
  },
  {
    path: '/js-test',
    name: 'JsTest',
    component: () => import('../components/js-test/JsTest.vue'),
  },
  {
    path: '/optional-test/:period',
    name: 'OptionalTest',
    component: () => import('../components/optional-test/OptionalTest.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;