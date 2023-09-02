<script setup>
import Header from './components/Header.vue';
import { useRouter } from "vue-router"
import { abortBooking } from "./modules/server.js"
import store from './vuex';

const router = useRouter()
/**
 * todo - CREATE NAVIGATION GUARD TO CHECK CLIENT SECRET IN VUEX BEFORE ALLOWING NAVIGATION INTO PAYMENTS.VUE
 */
router.beforeEach((to, from, next) => {
  if (to.name === "Payment") {
    const access = store.dispatch("checkClientSecret");
    if (!access) {
      next(false)
      console.log("'Before Resolve' guard is forbidding this navigation")
    } else {
      next()
    }
  } else {
    next()
  }
})
</script>

<template>
  <Header />
  <router-view class="router" v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
.router {
  position: absolute;
}

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
