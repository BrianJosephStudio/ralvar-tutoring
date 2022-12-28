<template>
    <div :id="props.class" :class="props.class" :data-date="dataDate" :data-av="props.available"
        @click="emitter.emit('selectDate', $event)">
        <h1 ref="grid">{{ title }}</h1>
    </div>
</template>

<script setup>
/* Imports */
import { ref, onUpdated, inject } from 'vue'
import { useStore } from 'vuex'
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
const emitter = inject('emitter')
/* Functions */

/* Mounted */
// const grid = ref(null)
// onUpdated(() => {
//     grid.value.parentElement.classList.remove('dayGridActive')
// })
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

    h1 {
        font-size: 40px;
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