<template>
    <div>
        <div>
            <h1>Yay, {{ ClientName }}!</h1>
            <h1>Your booking has been made successfully!</h1>
        </div>
        <div>
            <h2>Your Bookings:</h2>
            <div>
                <h3 v-for="date of BookedDates">{{ moment(date.start).format("MMM") }} {{
                    moment(date.start).format("Do") }}
                    | {{ moment(date.start).format("HH:mm") }} - {{ moment(date.end).format("HH:mm") }}</h3>
            </div>
        </div>
        <div>
            <h2>Confirmation Code: {{ ConfirmationCode }}</h2>
            <h2>An e-mail has been sent to {{ ClientEmail }} with these details</h2>
        </div>
        <div>
            <h3>If anything went wrong with this booking or you need to make any changes please click here:</h3>
            <button>Something has gone wrong</button>
        </div>

    </div>
</template>
<script setup>
import moment from "moment"
import { onMounted } from "vue";
const props = defineProps({
    ClientName: String,
    BookedDates: Array,
    ConfirmationCode: String,
    ClientEmail: String
})

</script>
<style scoped lang="scss"></style>