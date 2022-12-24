<script setup>
import Header from './components/Header.vue';
import Bookings from './views/Bookings.vue';
const tab = 'Bookings';
</script>

<template>
  <Header />
  <router-view></router-view>
</template>

<style scoped>

</style>
