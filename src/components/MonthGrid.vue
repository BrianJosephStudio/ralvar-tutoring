<template>
    <div id="monthGrid" class="monthGrid">
        <DayGrid v-for="day in moment.weekdaysShort()" :title="day" :class="'dayName'" />

        <DayGrid v-for="day in monthArray" :day="day" :class="dayGridType(day).class"
            :available="dayGridType(day).available" :title="day.format('Do').slice(0, -2)"
            :data-date="day.format('YYYY/MM/DD hh:mm a')" :id="monthArray.indexOf(day)" />
    </div>
</template>

<script setup>
/* Imports */
import moment from 'moment'
import { useStore } from 'vuex'
import DayGrid from './DayGrid.vue'

/* Props */
const props = defineProps({
    monthArray: Object
})
/* Data */
const store = useStore()

/* Methods */
/**
 * called during v-for loop to define the class of the v-for isntance
 * @param {Object} day moment.js isntance 
 */
function dayGridType(day) {

    let currentMonth = store.state.bookings.calendar.currentMonth;

    if (day.format('MMMM') != currentMonth) {
        if (day.weekday() == 0) { return { class: 'otherMonthWeekend', available: false } }
        return { class: 'otherMonth', available: true }
    }
    else if (day.weekday() == 0) { return { class: 'weekend', available: false } }
    return { class: 'dayGrid', available: true }
}

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
    border-radius: 1.5vw;
    /* box-shadow: 10px 30px 50px 0px hsl(133, 0%, 85%); */
}
</style>