<template >
    <div class="tab">
        <BaseCard 
            v-for="bookingType in BookingTypes"
            :cardTitle="bookingType.title"
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
                    {title: 'Single Class', route: '/bookings/single'},
                    {title: 'Class Bundles', route: '/bookings/bundles'},
                    {title: 'Send Me a Message', route: '/contact'}
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