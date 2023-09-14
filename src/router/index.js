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
      ClientName: route.query.ClientName || "Client",
      BookedDates:
        route.query.BookedDates ||
        JSON.stringify([
          {
            start: "2023-09-13T13:00:00.000Z",
            end: "2023-09-13T14:00:00.000Z",
          },
        ]),
      ConfirmationCode:
        route.query.ConfirmationCode || "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      ClientEmail: route.query.ClientEmail || "client@email.com",
    }),
  },
  {
    path: "/client-data",
    name: "ClientData",
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
    path: "/error",
    name: "Error",
    component: () => import("../views/Error.vue"),
    props: (route) => ({
      Error: route.query.error || "A generic error was encountered",
    }),
  },
  /*{
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue")
  }*/
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/Contact.vue"),
  },
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
