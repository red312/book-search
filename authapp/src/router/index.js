import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/MainPage.vue";
import BookPage from "../views/BookPage.vue";
import Login from "../views/Login.vue";
import Registration from "../views/Registration.vue";
import Favorite from "../views/FavoritePage.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Registration
  },
  {
    path: "/home",
    name: "main",
    component: Main,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: Favorite
  },
  {
      path: '/:bookName',
      name: 'book',
      props: true,
      component: BookPage
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
