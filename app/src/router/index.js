import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/Fee",
      name: "Fee",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/Fee.vue"),
    },
    {
      path: "/Bar",
      name: "Bar",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/Bar.vue"),
    },
    {
      path: "/feeperday",
      name: "FeePerDay",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/FeePerDay.vue"),
    },
    {
      path: "/feepermonth",
      name: "FeePerMonth",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/FeePerMonth.vue"),
    },
    {
      path: "/feeperyear",
      name: "FeePerYear",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/FeePerYear.vue"),
    },
  ];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  // base: "",
  routes,
});

export default router
