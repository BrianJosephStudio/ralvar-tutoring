<template>
    <h1>Book A Class</h1>
    <div class="bookingTabs">
        <router-view v-slot="{Component}">
            <transition name="fade">
                <component :is="Component"></component>
            </transition>
        </router-view>
    </div>
    <h3>Not sure which one is right for you?</h3>
    <button @click="this.$router.push('./classes')">Help Me Decide</button>
</template>

<script>
    import BookingType from './bookings/BookingType.vue';
    import SingleClass from './bookings/SingleClass.vue';
    export default {
        data(){
            return {
                bookingTab:'bookingType',
            }
        },
        methods:{
            updateRoute: () => {
                this.$router.push()
            }
        },
        components: {
            BookingType,
            SingleClass
        }
    }
</script>

<style scoped>
    .wrapper{
        display: flex;
        flex-wrap: wrap;
    }
    button{
        font-family: 'Raleway', sans-serif;
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
        transition: 0.2s;
    }
    .bookingTabs{
        display: flex;
        place-content: center;
        position: relative;
        height: 60vh;
    }
    .fade-enter-active{
        transition: 0.75s ease;
        transition-delay: 0.25s;
    }
    .fade-leave-active{
        transition: 0.75s ease;
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