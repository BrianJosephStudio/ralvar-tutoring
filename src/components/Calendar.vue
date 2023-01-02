<template>
    <div>
        <h1>{{ this.$store.state.bookings.calendar.currentMonth.format('MMMM') }} {{
        this.$store.state.bookings.calendar.currentMonth.format('YYYY')
}}</h1>
        <div class="wrapper">
            <div class="arrowButton" @click="() => changeMonth(-1)">
                <svg width="12" height="24">
                    <polygon points="0 12, 12 0, 12 24" class="arrow" />
                </svg>
            </div>
            <MonthGrid :monthArray="this.$store.state.bookings.calendar.monthArray" />
            <div class="arrowButton" @click="() => changeMonth(1)">
                <svg width="12" height="24">
                    <polygon points="0 0, 12 12, 0 24" class="arrow" />
                </svg>
            </div>
            <DayWindow :date="this.$store.state.bookings.calendar.selectedDates[0]" />
        </div>
    </div>

</template>
<script setup>
/* Imports */
import mitt from 'mitt'
import MonthGrid from './MonthGrid.vue'
import DayWindow from './DayWindow.vue'
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

}


</script>

<style scoped lang="scss">
.wrapper {
    display: flex;
    align-items: center;

    .arrowButton {
        display: flex;
        place-content: center;
        background-color: hsl(0, 0%, 93%);
        margin: 10px;
        height: 150px;
        width: 40px;
        border-radius: 15px;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
            background-color: hsl(0, 0%, 87%);
        }

        &:hover .arrow {
            fill: hsl(0, 0%, 50%);
        }

        svg {
            align-self: center;
        }

        .arrow {
            fill: hsl(0, 0%, 80%);
            transition: 0.2s;
        }
    }


}
</style>