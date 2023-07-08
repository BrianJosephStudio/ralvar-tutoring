import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/bookings",
  },
  {
    path: "/bookings",
    name: "Bookings",
    component: () => import("../views/Calendar.vue"),
  },
  {
    path: "/classes",
    name: "Classes",
    component: () => import("../views/Classes.vue"),
  },
  /*{
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue")
  }*/
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
