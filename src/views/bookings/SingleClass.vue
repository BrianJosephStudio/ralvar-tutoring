<template>
    <div class="comp">
        <!-- <h1 id="mamaguebo"> {{ this.$store.state.bookings.single.selectedDate }}</h1> -->
        <Calendar />

    </div>

</template>
<script setup>
import moment from 'moment'
import Calendar from '../../components/Calendar.vue'
</script>

<style scoped>
.comp {
    display: flex;
    flex-direction: column;
}
</style>