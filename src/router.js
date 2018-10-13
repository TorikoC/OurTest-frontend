import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/tests/:title',
      name: 'testDetails',
      props: true,
      component: () => import(/* webpackChunkName: "polygon" */ './views/TestDetails/index.vue'),
    },
    {
      path: '/room/:title',
      name: 'room',
      props: true,
      component: () => import(/* webpackChunkName: "polygon" */ './views/Room/index.vue'),

    },
    {
      path: '/polygon',
      name: 'polygon',
      component: () => import(/* webpackChunkName: "polygon" */ './views/Polygon'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "polygon" */ './views/Profile'),
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/Register.vue'),

    },
    {
      path: '/playground',
      name: 'playground',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/Playground'),
    },
  ],
});
