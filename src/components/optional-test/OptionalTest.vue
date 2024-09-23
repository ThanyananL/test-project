<template>
    <div class="container">
        <div class="left-panel">
            <div class="room-id-bar">
                <h2 class="room-id">{{ roomId }}</h2>
            </div>

            <p class="upcoming">Upcoming</p>
            <div class="date-section">
                <h1 class="day">{{ formatDay(bookings[0] && bookings[0].startTime) }}</h1>
                <h1 class="date">{{ formatDate(bookings[0] && bookings[0].startTime) }}</h1>
                <ul class="left-bookings-list">
                    <li v-for="booking in bookings.slice(0, 3)" :key="booking.id" class="left-booking">
                        <span class="booking-time">{{ formatTime(booking.startTime) }} - {{ formatTime(booking.endTime)
                            }}</span>
                        <p class="booking-title">{{ booking.title }}</p>
                    </li>
                </ul>
            </div>
        </div>

        <div class="right-panel">
            <div class="tabs">
                <div class="tab" @click="setPeriod('thisweek')" :class="{ active: period === 'thisweek' }">
                    thisweek
                </div>
                <div class="tab" @click="setPeriod('nextweek')" :class="{ active: period === 'nextweek' }">
                    nextweek
                </div>
                <div class="tab" @click="setPeriod('wholemonth')" :class="{ active: period === 'wholemonth' }">
                    wholemonth
                </div>
            </div>

            <div v-if="bookings.length" class="section-right">
                <div class="section-header">Today (Mon, 28 Sep)</div>
                <ul class="right-bookings-list">
                    <li v-for="booking in bookings.slice(0, 3)" :key="booking.id" class="right-booking">
                        <div class="right-booking-detail">
                            <div class="dot"></div>
                            <div class="booking-info">
                                <div class="booking-time-right">{{ formatTimeRange(booking.startTime, booking.endTime)
                                    }}</div>
                                <p class="booking-title-right">{{ booking.title }}</p>
                            </div>
                        </div>
                    </li>
                </ul>

                <div class="section-header">Tomorrow (Tue, 29 Sep)</div>
                <ul class="right-bookings-list">
                    <li v-for="booking in bookings.slice(3, 6)" :key="booking.id" class="right-booking">
                        <div class="right-booking-detail">
                            <div class="dot"></div>
                            <div class="booking-info">
                                <div class="booking-time-right">{{ formatTimeRange(booking.startTime, booking.endTime)
                                    }}</div>
                                <p class="booking-title-right">{{ booking.title }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <p v-else class="section-right">No bookings found</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            roomId: this.$route.query.roomId,
            period: this.$route.params.period,
        };
    },
    computed: {
        ...mapGetters(['getBookingData']),
        bookings() {
            if (this.period === 'thisweek') {
                return this.getBookingData.filter(booking => booking.roomId === this.roomId);
            }
            return [];
        },
    },
    methods: {
        setPeriod(period) {
            this.period = period;
        },
        formatTimeRange(startTime, endTime) {
            return `${this.formatTime(startTime)} - ${this.formatTime(endTime)}`;
        },
        formatTime(dateString) {
            if (!dateString) return '';
            const options = { hour: '2-digit', minute: '2-digit' };
            return new Date(dateString).toLocaleTimeString('en-GB', options);
        },
        formatDay(dateString) {
            if (!dateString) return '';
            const options = { weekday: 'long' };
            return new Date(dateString).toLocaleDateString('en-GB', options);
        },
        formatDate(dateString) {
            if (!dateString) return '';
            const options = { day: 'numeric', month: 'short' };
            return new Date(dateString).toLocaleDateString('en-GB', options);
        }
    },
    mounted() {
        this.$store.dispatch('fetchBookingData');
    },
};
</script>


<style scoped>
.container {
    display: flex;
    width: 50%;
}

.left-panel {
    flex: 1;
    background-color: #3b4d9e;
    color: white;
    padding-left: 70px;
    min-height: 80vh;
}

.right-panel {
    flex: 2;
    background-color: #fff;
}

.room-id-bar {
    background-color: #27b1e3;
    padding: 30px;
}

.room-id {
    font-size: 40px;
    color: white;
    margin: 0;
}

.upcoming {
    font-size: 16px;
    font-weight: 300;
    margin-top: 80px;
}

.date-section {
    margin-top: 0px;
}

.day {
    font-size: 36px;
    font-weight: 300;
    margin-top: 80px;
}

.date {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 80px;
}

.left-bookings-list {
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
}

.left-booking {
    margin-bottom: 20px;
}

.booking-time {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
}

.booking-title {
    font-size: 16px;
    color: white;
    margin-top: 5px;
}

.tabs {
    display: flex;
    gap: 100px;
    margin-bottom: 50px;
    border-bottom: 1px solid #ddd;
    height: 105px;
    align-items: center;
    padding-left: 40px;
    background: #EFEEEC;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.tab {
    padding: 20px 0;
    cursor: pointer;
    color: #888;
    position: relative;
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    padding-top: 40px;
    text-align: center;
}

.tab.active {
    color: #000;
}

.tab.active::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    height: 3px;
    width: 40px;
    background-color: #3b4d9e;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.tab:hover {
    color: #555;
}

.right-bookings-list {
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
}

.right-booking {
    margin-bottom: 20px;
}

.right-booking-detail {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: white;
    border-radius: 8px;
}

.booking-time-right {
    font-size: 14px;
    color: #666;
    margin-right: 15px;
}

.booking-title-right {
    font-size: 16px;
    color: #333;
}

.section-right {
    margin-left: 50px;
}

.section-header {
    background: #F7F7F7;
    padding: 10px;
}
</style>