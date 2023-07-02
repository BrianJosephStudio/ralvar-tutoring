<template >
    <div class="tab">
        <BaseCard v-for="bookingType in BookingTypes" :cardTitle="bookingType.title" :cardText="bookingType.text"
            @click="handleClick((bookingType.classCount))" />
    </div>
</template>

<script setup>
/* Imports */
import { useStore } from 'vuex'
import BaseCard from '../../components/BaseCard.vue'
import { useRouter } from 'vue-router'

/* Data */
const store = useStore()
const router = useRouter();
const BookingTypes = [
    {
        title: 'Single Class',
        text: 'Single classes are super-duper cool! You should do it man.',
        classCount: 1
    },
    {
        title: '4 Class Bundle',
        text: 'Bundles are even fucking cooler!!! Please PLEASE book a bundle coño.',
        classCount: 4
    },
    {
        title: '8 Class Bundle',
        text: 'Please Message me Daddy',
        classCount: 8
    }
]
/* Methods */
const handleClick = (classCount) => {
    router.push('bookings/format');
    store.commit('setClassCount', { classCount: classCount })
}
</script>

<style scoped>
.tab {
    display: flex;
    position: absolute;
}
</style>