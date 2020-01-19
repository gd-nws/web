import Vue from "vue";
import VueRouter from "vue-router";
import HeadlinesView from "../views/HeadlinesView.vue";
import HeadlineView from "../views/HeadlineView.vue";
import Search from "../views/Search.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/headlines",
    name: "headlinesView",
    component: HeadlinesView
  },
  {
    path: "/headlines/:id",
    name: "HeadlineView",
    component: HeadlineView
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "/cookie-policy",
    name: "cookie-policy",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CookiePolicy.vue")
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
