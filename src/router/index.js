import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home/Home.vue';
import Weather from '../views/Weather/Weather.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/weather',
    name: 'weather',
    component: Weather
  },
  {
    path: '*',
    redirect: '/'
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
