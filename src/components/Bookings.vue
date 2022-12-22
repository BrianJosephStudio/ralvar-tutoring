<template>
    <div class="frame">
        <h1>Book A Class</h1>
        <div class="bookingTabs">
            <div class="tab">
            <transition name="fade">
                <component v-if="bookingTab=='bookingType'" v-bind:is="BookingType" @updateTab="bookingTab=$event"/>
            </transition>
        </div>
        <div class="bookingTabs">
            <transition name="fade">
                <component v-if="bookingTab=='Calendar'" v-bind:is="Calendar" @updateTab="bookingTab=$event"/>
            </transition>
        </div>
        </div>
        <h3>Not sure which one is right for you?</h3>
        <button v-on:click="changeTitle">Help Me Decide</button>
    </div>
</template>

<script>
    import BookingType from './BookingType.vue';
    import Calendar from './Calendar.vue'
    export default {
        data(){
            return {
                bookingTab:'bookingType'
            }
        },
        components: {
            BookingType,
            Calendar
        }
    }
</script>

<style scoped>
    button{
        font-family: 'Raleway', sans-serif;
    }
    .frame {
        display: flex;
        flex-direction: column;
        place-content: top;
        align-items: center;
        height: 95vh;
    }
    .helpButton{
        display: flex;
        background: hsl(0, 0%, 90%);
        cursor: pointer;
        transition: 0.4s;
        border-radius: 10px;
    }
    .helpButton:hover{
        box-shadow: 0px 0px 10px 0px hsl(0, 0%, 80%);
        border-radius: 25px;
    }
    .helpButton:active{
        background: hsl(0,0%,80%);
        transition: 0s;
    }
    .bookingTabs{
        display: flex;
        place-content: center;
        position: relative;
        height: 60vh;
    }
    .tab{
        position: absolute;
    }
    .fade-enter-active{
        transition: 1s ease;
        transition-delay: 0.3s;
    }
    .fade-leave-active{
        transition: 1s ease;
    }
    .fade-enter-from{
        opacity: 0;
        transform: translateX(200px)
    }
    .fade-leave-to{
        opacity: 0;
        transform: translateX(-200px)
    }
    .fade-leave-from, .fade-enter-to{
        opacity: 1;
    }
</style>