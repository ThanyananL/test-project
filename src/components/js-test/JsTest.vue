<template>
    <div v-if="bookingData && bookingData.length">
        <h1>Booking Information</h1>
        <ul>
            <li v-for="booking in bookingData" :key="booking.id">
                {{ booking.roomId }} {{ booking.title }} - From {{ booking.startTime }} To {{ booking.endTime }}
            </li>
        </ul>
    </div>
    <p v-else>Loading booking data...</p>
</template>

<script>
export default {
    computed: {
        bookingData() {
            return this.$store.getters.getBookingData; 
        }
    },
    mounted() {
        this.$store.dispatch('fetchBookingData'); 
    }
}
</script>