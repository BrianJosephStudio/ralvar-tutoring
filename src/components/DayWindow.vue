<template>
    <transition name="fade">
    <div class="dayWindow" v-if="store.state.bookings.calendar.targetDate !== null" :style="{left: `${store.state.bookings.calendar.dayWindowPos[0]}px`}">
                <div class="header">
                    <h2>{{ moment(store.state.bookings.calendar.targetDate, 'YYYY/MM/DD hh:mm a').format('dddd MMM Do') }}</h2>
                </div>
                <div class="hourList">
                    <HourItem v-for="hour in getHourArray()" :hour="hour"></HourItem>
                    <!-- v-for="hour in getHourArray(date)" :hour="hour" -->
                </div>
            </div>
    </transition>
</template>

<script setup>
import HourItem from './HourItem.vue'
import { useStore } from 'vuex'
import moment from 'moment'
import { ref } from 'vue';
const store = useStore();
// Props
const props = defineProps({
})

// Data
//Methods
function getHourArray() {
    const targetDate = store.state.bookings.calendar.targetDate
    const classFormat = store.state.bookings.availability.classFormat.format
    if (targetDate == null) { return }
    let date = moment(targetDate, 'YYYY/MM/DD hh:mm a')
    let hour = date.startOf('day').add(11, 'hours')
    let output = []
    let i = 0;
    do {
        let start = hour.format('HH:mm')
        let end = hour.add(classFormat, 'minutes').format('HH:mm');
        let item = `${start} - ${end}`
        output.push(item)
        hour.add(-(classFormat - 30), 'minutes')
        i++
    } while (hour.format('HH') <= 20)
    return output

}

</script>


<style scoped lang="scss">
@mixin common {
    border-radius: 2vw;
}

.dayWindow {
    position: absolute;
    top: 120px;
    display: flex;
    flex-direction: column;
    place-content: center;
    margin: 20px;
    @include common;
    min-width: 6vw;
    width: 14vw;
    border-style: solid;
    border-color: hsl(0, 0%, 93%);
    border-width: 2px;
    height: 24vw;
    background-color: hsla(0, 100%, 94%,0.5);
    overflow: hidden;
    z-index: 3;

    
    .header {
        background-color: hsl(0, 0%, 75%);
        height: 20%;
        background-color: hsl(260, 40%, 75%);
        width: inherit;
        min-width: 150px;
        
        
        h2 {
            color: black;
            // font-family: Arial, Helvetica, sans-serif;
            font-weight: 300;
            font-size: 16px;
            color: hsl(0, 0%, 93%);
        }
    }
    
    .hourList {
        background-color: hsl(0, 0%, 93%);
        overflow-y: scroll;
        cursor: pointer;
        min-width: 150px;
        width: inherit;
        h2 {
            color: black;
        }
    }
}

.fade-enter-active {
    transition: 0.3s ease-out;
    transition-delay: 0.15s;
}

.fade-leave-active {
    transition: 0.3s ease-in;
}

.fade-enter-from {
    opacity: 0;
    transform: translateX(60px)
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(-60px)
}

/* width */
::-webkit-scrollbar {
    width: 2vw;
}

/* Track */
::-webkit-scrollbar-track {
    background: hsl(0, 0%, 96%);
    border-radius: 0px 0px 2vw 0px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: hsl(0, 0%, 87%);
    border-radius: 0px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: hsl(0, 0%, 90%);
}
</style>