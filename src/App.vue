<script setup>
import Header from './components/Header.vue';
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
