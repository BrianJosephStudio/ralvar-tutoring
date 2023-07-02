<template>
    <div class="dayWindow">
        <transition name="fade">
            <div class="container" v-if="date == null">
                <h2 class="noDate">No date selected</h2>
            </div>
        </transition>
        <transition name="fade">
            <div id="dayWindowCont" class="container" v-if="date != null">
                <div class="header">
                    <h2>{{ moment(date, 'YYYY/MM/DD hh:mm a').format('dddd MMM Do') }}</h2>
                </div>
                <div class="hourList">
                    <HourItem v-for="hour in getHourArray(date, classFormat)" :hour="hour"></HourItem>
                    <!-- v-for="hour in getHourArray(date)" :hour="hour" -->
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import HourItem from './HourItem.vue'
import { useStore } from 'vuex'
import moment from 'moment'
import { ref } from 'vue';
const store = useStore();
// Props
const props = defineProps({
    date: String,
    classFormat: Number
})

// Data
//Methods
function getHourArray(input, classFormat) {
    if (input == undefined) { return }
    let date = moment(input, 'YYYY/MM/DD hh:mm a')
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
    border-radius: 35px;
}

.dayWindow {
    position: relative;
    display: flex;
    flex-direction: column;
    place-content: center;
    margin: 20px;
    @include common;
    min-width: 150px;
    width: 450px;
    border-style: solid;
    border-color: hsl(0, 0%, 93%);
    border-width: 2px;
    height: 22vw;
    background-color: hsl(0, 0%, 94%);
    overflow: hidden;

    h2 {
        color: black;
    }

    #dayWindowCont {
        display: flex;
        height: inherit;
        min-width: 150px;
        width: inherit;

    }

    .header {
        background-color: hsl(0, 0%, 75%);
        width: 100%;
        border-radius: 35px 35px 0px 0px;
        background-color: hsl(260, 40%, 75%);
        width: inherit;
        min-width: 150px;


        h2 {
            color: black;
            // font-family: Arial, Helvetica, sans-serif;
            font-weight: 300;
            color: hsl(0, 0%, 93%);
        }
    }

    .hourList {
        background-color: hsl(0, 0%, 93%);
        overflow-y: scroll;
        border-radius: 0px 0px 35px 35px;
        cursor: pointer;
        min-width: 150px;
        width: inherit;
    }

    .container {
        display: flex;
        flex-direction: column;
        min-width: 150px;
        width: inheri t;
        position: absolute;
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
    transform: translateY(60px)
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(-60px)
}

/* width */
::-webkit-scrollbar {
    width: 35px;
}

/* Track */
::-webkit-scrollbar-track {
    background: hsl(0, 0%, 96%);
    border-radius: 0px 0px 35px 35px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: hsl(0, 0%, 87%);
    border-radius: 35px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: hsl(0, 0%, 90%);
}
</style>