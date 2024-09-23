import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    bookingData: []
  },
  mutations: {
    setBookingData(state, bookings) {
      state.bookingData = bookings;
    }
  },
  actions: {
    async fetchBookingData({ commit }) {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/forviz/developer-test/master/02-venue-booking/demo-booking-data.json');
        console.log(response.data);
        commit('setBookingData', response.data);
      } catch (error) {
        console.error('err fetching booking data', error);
      }
    }
  },
  getters: {
    getBookingData: state => state.bookingData
  }
});