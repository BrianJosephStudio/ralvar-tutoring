<template>
    <div>
        <h1>{{ this.$store.state.bookings.currentMonth.format('MMMM') }} {{
                this.$store.state.bookings.currentMonth.format('YYYY')
        }}</h1>
        <div class="wrapper">
            <div class="arrowButton" @click="() => changeMonth(-1)"></div>
            <MonthGrid :monthArray="this.$store.state.bookings.monthArray" />
            <div class="arrowButton" @click="() => changeMonth(1)"></div>
        </div>
    </div>

</template>
<script setup>
/* Imports */
import moment from 'moment';
import { ref, watch } from 'vue'
import MonthGrid from './MonthGrid.vue'
import { useStore } from 'vuex';
//
/* Props */
const props = defineProps({
    selectableDates: Number
})
/* Data */
const store = useStore();
store.commit('buildMonth')

/* Methods */
function changeMonth(n) {
    store.commit('changeMonth', { amount: n }); store.commit('buildMonth')
    //create div array
    let dateSel = store.state.bookings.single.selectedDate;
    let days = document.getElementById('monthGrid').children;

    setTimeout(() => {
        for (let j = 0; j < days.length; j++) {
            for (let i = 0; i < dateSel.length; i++) {
                // console.log(dateSel[i] === days.item(j).getAttribute('data-date'))
                // days.item(j).className = days.item(j).getAttribute('id')
                if (dateSel[i] === days.item(j).getAttribute('data-date')) {

                    days.item(j).className = 'dayGrid';
                    days.item(j).classList.add('dayGridActive');
                    console.log(days.item(j).className)
                    console.log(days.item(j).classList)
                    console.log(dateSel[i])
                    console.log(days.item(j).getAttribute('id'))


                    break
                }
            }
        }
    }, 5);

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