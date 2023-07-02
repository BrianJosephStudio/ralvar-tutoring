import { createWebHistory, createRouter } from "vue-router";


const routes = [
  {
    path: "/",
    redirect: "/bookings"
  },
  {
    path: "/bookings",
    name: "Bookings",
    component: () => import("../views/Bookings.vue"),
    children:[
      {
        path: "",
        name: "Booking Types",
        component: () => import("../views/bookings/Calendar.vue"),
      },
      {
        path: "format",
        name: "Class Format",
        component: () => import("../components/ClassFormat.vue")
      },
      {
        path: "dates",
        name: "Dates",
        component: () => import("../views/bookings/Calendar.vue"),
        props:{
          selectableDates: 1
        }
      }
    ]
  },
  {
    path: "/classes",
    name: "Classes",
    component: () => import("../views/Classes.vue"),
  }
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