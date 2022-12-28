<template>
    <div class="comp">
        <!-- <h1 id="mamaguebo"> {{ this.$store.state.bookings.calendar.selectedDates }}</h1> -->
        <Calendar />

    </div>
</template>
<script setup>
import Calendar from '../../components/Calendar.vue'

</script>

<style scoped>
.comp {
    display: flex;
    flex-direction: column;
}
</style>