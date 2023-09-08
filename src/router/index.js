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
    path: "/booking_complete",
    name: "bookingComplete",
    component: () => import("../views/SuccessfulBooking.vue"),
    props: (route) => ({
      ClientName: route.query.ClientName,
      BookedDates: JSON.parse(route.query.BookedDates),
      ConfirmationCode: route.query.ConfirmationCode,
      ClientEmail: route.query.ClientEmail,
    }),
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
  {
    path: "/payment",
    name: "Payment",
    component: () => import("../views/Payment.vue"),
  },
  {
    path: "/payment_processing",
    name: "paymentProcessing",
    component: () => import("../components/PaymentProcessing.vue"),
  },
  {
    path: "/payment_error",
    name: "paymentError",
    component: () => import("../views/PaymentError.vue"),
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
