<template>
  <Header />
  <router-view class="router" v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import Header from './components/Header.vue';
import { useRouter } from "vue-router"
import { abortBooking } from "./modules/server.js"
import { useStore } from "vuex"

const store = useStore()
const router = useRouter()
router.beforeEach(async (to, from, next) => {
  if (to.name === "Payment") {
    const access = await store.dispatch("checkClientSecret");
    if (!access) {
      console.log("'Before Resolve' guard is forbidding this navigation")
      store.dispatch("resetAllState")
      next({ name: "Bookings" })
    } else {
      next()
    }
  } else if (to.name === "bookingComplete") {
    next()
    if (store.state.bookings.booking.confirmed) {
      next()
    } else {
      next({ name: "Bookings" })
    }
  } else if (to.name === "Contact Confirmation" && !Object.keys(to.query).length) {
    console.log("navigation Guard prevented", to.name)
    router.push({ name: "Bookings" })

  } else {
    next()
  }
})

</script>

<style scoped lang="scss">
.fade-enter-active {
  transition: 1s ease;
  transition-delay: 0.35s;
}

.fade-leave-active {
  transition: 0.35s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(200px)
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-200px)
}
</style>
