<template>
    <div id="monthGrid" class="monthGrid">
        <DayGrid v-for="day in moment.weekdaysShort()" :title="day" :class="'dayName'" />

        <DayGrid v-for="day in props.monthArray" :day="day" :class="dayGridType(day).class"
            :available="dayGridType(day).available" :title="day.format('Do').slice(0, -2)"
            :data-date="day.format('YYYY/MM/DD hh:mm a')" :id="props.monthArray.indexOf(day)" />
    </div>
</template>

<script setup>
/* Imports */
import moment from 'moment'
import { onMounted } from 'vue';
import { useStore } from 'vuex'
import DayGrid from './DayGrid.vue'

/* Props */
const props = defineProps({
    monthArray: Object
})
/* Data */
const store = useStore()
const currentMonth = store.state.bookings.currentMonth;
/* Methods */
function dayGridType(day) {
    let currentMonth = store.state.bookings.currentMonth.format('MMMM');
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
    border-radius: 35px;
    /* box-shadow: 10px 30px 50px 0px hsl(133, 0%, 85%); */
}
</style>