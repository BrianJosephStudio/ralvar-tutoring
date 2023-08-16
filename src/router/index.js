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
    path: "/client-data",
    component: () => import("../views/ClientData.vue"),
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
  {
    path: "/:pathMatch(.*)",
    component: () => import("../views/TabNotFound.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
