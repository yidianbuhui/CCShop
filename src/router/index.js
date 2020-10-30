import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/error",
    name: "Error",
    component: () => import("../components/Error.vue")
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../components/404.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/goods",
    name: "Goods",
    component: () => import("../views/Goods.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/goodsDetails",
    name: "GoodsDetails",
    component: () => import("../views/GoodsDetails.vue")
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue")
  },
  {
    path: "/paySuccess",
    name: "PaySuccess",
    meta: {
      title: "支付页面",
      keepAlive: false
    },
    components: {
      blank: resolve => require(["@/views/paySuccess.vue"], resolve)
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
