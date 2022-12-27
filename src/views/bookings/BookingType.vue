<template >
    <div class="tab">
        <BaseCard 
            v-for="bookingType in BookingTypes"
            :cardTitle="bookingType.title"
            :cardText="bookingType.text"
            :key="bookingType.route"
            @click="this.$router.push(bookingType.route)"
            />
    </div>
</template>

<script>
    import BaseCard from '../../components/BaseCard.vue'

    export default {
        data(){
            return {
                BookingTypes:[
                    {
                        title: 'Single Class',
                        text: 'Single classes are super-duper cool! You should do it man.',
                        route: '/bookings/single'},
                    {
                        title: 'Class Bundles',
                        text: 'Bundles are even fucking cooler!!! Please PLEASE book a bundle coño.',
                        route: '/bookings/bundles'},
                    {
                        title: 'Send Me a Message',
                        text: 'Please Message me Daddy',
                        route: '/contact'}
                ]
            }
        },
        methods: {
            updateRoute: () => {

            }
        },
        components:{
            BaseCard
        }
    }
</script>

<style scoped>
.tab{
    display: flex;
    position: absolute;
}
</style>