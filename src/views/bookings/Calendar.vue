<template>
    <div>
        <h1>{{ this.$store.state.bookings.calendar.currentMonth }} {{
            this.$store.state.bookings.calendar.currentYear
        }}</h1>
        <div class="wrapper">
            <div style="display: flex;">
                <ClassFormat :ClassFormat="classFormat"></ClassFormat>
                <HourRange></HourRange>
            </div>
            <div style="display:flex;">
                <div class="calendarLayout">
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
                </div>
                <!-- <div class="dayWindows">
                    <DayWindow v-for="date in this.$store.state.bookings.calendar.selectedDates" :date="date"
                        :classFormat="this.$store.state.bookings.booking.classData.classFormat" />
                </div> -->
            </div>
        </div>
    </div>

</template>
<script setup>
/* Imports */
import mitt from 'mitt'
import HourSelection from '../../components/HourSelection.vue'
import ClassFormat from '../../components/ClassFormat.vue'
import HourRange from '../../components/HourRange.vue'
import MonthGrid from '../../components/MonthGrid.vue'
import DayWindow from '../../components/DayWindow.vue'
import { useStore } from 'vuex';
import { provide, onMounted } from 'vue';

/* Props */
const props = defineProps({
    selectableDates: Number
})
/* Data */
const store = useStore()
store.commit('buildMonth')
const emitter = mitt()
provide('emitter', emitter)
const classFormat = {
    selected : 0,
    options : [
        {
            title: '30 Minutes',
            minuteCount: 30,
            index: 0
        },
        {
            title: '45 Minutes',
            minuteCount: 45,
            index: 1
        },
        {
            title: '60 Minutes',
            minuteCount: 60,
            index: 2
        },
        {
            title: '90 Minutes',
            minuteCount: 90,
            index: 3
        }
    ]
}
/* Calendar Events Handling */

emitter.on('monthChange', () => {
    renderSelectedDates()
})
emitter.on('selectDate', (event) => {
    let available = event.currentTarget.getAttribute('data-av');
    if (available == 'false') { return }
    // get dayArray
    let date = event.currentTarget.getAttribute('data-date');
    // if date was already selected, remove selection
    if (event.currentTarget.classList.contains('dayGridActive')) {
        store.commit('removeDate', { date: date })
        event.currentTarget.className = event.currentTarget.getAttribute('id')
    }
    // else
    else {
        //event.currentTarget.className = event.currentTarget.getAttribute('id')
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

    // set up select/de-select
    // event.currentTarget.classList.toggle('dayGridActive')

    //update SelectedDates state
})



/* Methods */
function changeMonth(n) {
    store.commit('changeMonth', { amount: n }); store.commit('buildMonth')
    emitter.emit('monthChange')
}
function renderSelectedDates() {
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
}

onMounted(() => { renderSelectedDates() })
</script>

<style scoped lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    .dayWindows {
        background-color: red;
        display: flex;
        width: 500px;
        overflow: scroll;
        padding: 0%;
    }

    .calendarLayout {
        display: flex;
        align-items: center;
    }

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