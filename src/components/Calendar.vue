<template>
    <div class="calendar" v-on:click="updateTab('bookingType')">
        <h1>Brah</h1>
    </div>
    <component v-bind:is="FullCalendar"/>
</template>
<style scoped>
    .calendar{
        display: flex;
        flex-direction: column;
        place-content: center;
        border-radius: 35px;
        width: 25vw;
        height: 25vw;
        background: rgb(219, 219, 219);
        opacity: 50%;
        cursor: pointer;
        transition: 0.5s ease;
    }
    .calendar:hover{
        opacity: 100%;
        box-shadow: 0px 10px 15px 0px hsl(0, 0%, 80%)
    }
    .calendar:active{
        background: hsl(0, 0%, 75%);
        transition: 0.1s;
    }
</style>
<script>
import FullCalendar from '@fullcalendar/vue3';

export default {
    data() {
        return {
            FullCalendar : FullCalendar,
            calendarOptions: {
                //plugins: [ dayGridPlugin, interactionPlugin ],
                //initialView: 'dayGridMonth',
                dateClick: this.handleDateClick,
                events: [
                    { title: 'event 1', date: '2019-04-01' },
                    { title: 'event 2', date: '2019-04-02' }
                ]
            }
        }
    },
    components: {
    FullCalendar // make the <FullCalendar> tag available
    },
    methods: {
        updateTab(tabName){
            this.$emit('updateTab',tabName)
        },
        handleDateClick: function(arg) {
        alert('date click! ' + arg.dateStr)
        }
    }
}
</script>