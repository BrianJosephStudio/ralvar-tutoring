<template>
  <div id="monthGrid" class="monthGrid">
    <DayGrid
      v-for="day in moment.weekdaysShort()"
      :title="day"
      :class="'dayName'"
    />

    <DayGrid
      v-for="day in monthArray"
      :day="day.date"
      :class="`${day.class} ${day.active}`"
      :available="day.available"
      :partial="day.partialAvailability"
      :title="day.date.format('Do').slice(0, -2)"
      :data-date="day.date.format('YYYY/MM/DD hh:mm a')"
      :id="monthArray.indexOf(day)"
    />
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
  display: flex;
  flex-wrap: wrap;
  place-content: center;
  background-color: hsl(0, 0%, 94%);
  width: 40vw;
  height: calc();
  padding: 12px;
  border-radius: 0 0 1.5vw 1.5vw;
  /* box-shadow: 10px 30px 50px 0px hsl(133, 0%, 85%); */
}
</style>
