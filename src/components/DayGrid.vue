<template>
    <div :id="props.id" :class="props.class" :data-date="dataDate" @click="selectDate($event)">
        <h1 ref="grid">{{ title }}</h1>
    </div>
</template>

<script setup>
/* Imports */
import { ref, onUpdated } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'
/* Props */
const props = defineProps({
    available: Boolean,
    day: Object,
    title: String,
    class: String,
    type: String,
    selectableDates: Number,
    dataDate: String,
    id: Number
})
/* Data */
const store = useStore()
/* Functions */
function selectDate(event) {
    let days = document.getElementById('monthGrid').children;
    for (let i = 7; i < days.length; i++) {
        let day = days[i];
        // for (let j = 0; j < dateSelection.length; j++) {
        //     let sel = dateSelection[j];
        //     if (day.dataset.date == sel) { alert('yeah') }
        //     else { alert('nah') }
        // }
        if (day === event.currentTarget) { continue }
        days[i].classList.remove('dayGridActive')
    }

    if (!props.available) { return }

    event.currentTarget.classList.toggle('dayGridActive')

    let x = event.currentTarget.getAttribute('data-date');
    store.commit('addDate', { bookingType: 'single', date: x })
}
/* Mounted */
const grid = ref(null)
onUpdated(() => {
    grid.value.parentElement.classList.remove('dayGridActive')
})
</script>


<style scoped lang="scss">
@mixin grid {
    display: flex;
    flex-direction: column;
    place-content: center;
    padding: 0px;
    margin: 1px;
    width: calc(40vw / 7 - 6px);
    height: calc(25vw / 7 - 6px);
    border-radius: 15px;
}

@mixin gridHov {
    background-color: hsl(308, 40%, 85%);
}

.dayName {
    @include grid;

    h1 {
        font-size: 25px;
    }
}

.dayGrid {
    @include grid;
    background: transparent;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        @include gridHov;
    }

    h1 {
        font-size: 40px;
        margin: 0px;
    }

}

.dayGridActive {
    cursor: pointer;
    background-color: hsl(308, 40%, 75%);

    &:hover {
        background-color: hsl(308, 40%, 75%);
    }
}

.weekend {
    @include grid;

    h1 {
        color: lightcoral;
        font-size: 40px;
        margin: 0px;
    }
}

.otherMonth {
    @include grid;
    cursor: pointer;
    opacity: 0.2;

    &:hover {
        @include gridHov
    }
}

.otherMonthWeekend {
    @include grid;
    opacity: 0.2;

    h1 {
        color: lightcoral;
        font-size: 40px;
        margin: 0px;
    }

}
</style>