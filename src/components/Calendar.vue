<template>
    <div>
        <h1>{{ this.$store.state.bookings.calendar.currentMonth.format('MMMM') }} {{
        this.$store.state.bookings.calendar.currentMonth.format('YYYY')
}}</h1>
        <div class="wrapper">
            <div class="arrowButton" @click="() => changeMonth(-1)"></div>
            <MonthGrid :monthArray="this.$store.state.bookings.calendar.monthArray" />
            <div class="arrowButton" @click="() => changeMonth(1)"></div>
        </div>
    </div>

</template>
<script setup>
/* Imports */
import mitt from 'mitt'
import MonthGrid from './MonthGrid.vue'
import { useStore } from 'vuex';
import { provide } from 'vue';

/* Props */
const props = defineProps({
    selectableDates: Number
})
/* Data */
const store = useStore()
store.commit('buildMonth')
const emitter = mitt()
provide('emitter', emitter)
/* Calendar Events Handling */

emitter.on('monthChange', () => {
    //create div array
    let selectedDates = store.state.bookings.calendar.selectedDates;
    let days = document.getElementById('monthGrid').children;

    for (let i = 0; i < days.length; i++) {
        days.item(i).classList.remove('dayGridActive')

        setTimeout(() => {
            for (let j = 0; j < selectedDates.length; j++) {

                if (selectedDates[j] === days.item(i).getAttribute('data-date')) {

                    days.item(i).className = 'dayGrid';
                    days.item(i).classList.add('dayGridActive');


                    break
                }
            }

        }, 0);
    }
})
emitter.on('selectDate', (event) => {
    // get dayArray
    let date = event.currentTarget.getAttribute('data-date');
    if (event.currentTarget.classList.contains('dayGridActive')) {
        store.commit('removeDate', { date: date })
        event.currentTarget.className = event.currentTarget.getAttribute('id')
    }
    else {
        event.currentTarget.className = event.currentTarget.getAttribute('id')
        store.commit('addDate', { bookingType: 'bundle', date: date })
    }

    let days = document.getElementById('monthGrid').children;
    let selectedDates = store.state.bookings.calendar.selectedDates;

    for (let i = 7; i < days.length; i++) {
        let day = days[i];

        // deselect all days but currentTarget
        day.className = day.getAttribute('id')
        for (let j = 0; j < selectedDates.length; j++) {

            if (selectedDates[j] === days.item(i).getAttribute('data-date')) {
                days.item(i).className = 'dayGrid';
                days.item(i).classList.add('dayGridActive');
            }
        }

    }
    //Make sure only available days are selectable
    let available = event.currentTarget.getAttribute('data-av');
    if (!available) { return }

    // set up select/de-select
    // event.currentTarget.classList.toggle('dayGridActive')

    //update SelectedDates state
})



/* Methods */
function changeMonth(n) {
    store.commit('changeMonth', { amount: n }); store.commit('buildMonth')
    emitter.emit('monthChange')
}


</script>

<style scoped lang="scss">
.wrapper {
    display: flex;
    align-items: center;

    .arrowButton {
        background-color: hsl(0, 0%, 94%);
        margin: 12px;
        height: 150px;
        width: 60px;
        border-radius: 15px;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
            background-color: hsl(0, 0%, 85%);
        }
    }

}
</style>