<template>
  <div id="monthGrid" class="monthGrid">
    <DayGrid v-for="day in moment.weekdaysShort()" :title="day" classname="dayName" />

    <DayGrid v-for="day in monthArray" :day="day.date" :classname="`${day.class} ${day.active}`"
      :available="day.available" :partial="day.partialAvailability" :title="day.date.format('Do').slice(0, -2)"
      :data-date="day.date.toISOString()" :id="monthArray.indexOf(day)" />
  </div>
</template>

<script setup>
/* Imports */
import moment from "moment";
import { useStore } from "vuex";
import DayGrid from "./DayGrid.vue";
import { dayGridType } from "../modules/static.js";

/* Props */
const props = defineProps({
  monthArray: Object,
});
/* Data */
const store = useStore();

/* Methods */
</script>

<style scoped>
.monthGrid {
  display: grid;
  grid-template-columns: repeat(7, auto);
  grid-gap: 0.3rem;
  /* place-content: center; */
  background-color: hsl(0, 0%, 94%);
  /* width: 60rem; */
  padding: 0 0.6rem 1rem 0.6rem;
  border-radius: 0 0 0 2rem;
  /* box-shadow: 10px 30px 50px 0px hsl(133, 0%, 85%); */
}

</style>
