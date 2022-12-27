import moment from 'moment';
import {createStore } from 'vuex'
 
 
 const store = createStore({
    state () {
        return {
            bookings : {
                currentMonth: moment(),
                monthArray: [],
                maxDates : 4,
                single : {
                    selectedDate : []
                },
                bundle : {
                    selectedDates : []
                }
            }
        }
    },
    mutations: {
        changeMaxDates : (state,newVal) => {state.bookings.maxDates = newVal},
        addDate : ( state , payload ) => {
            let dateArray = state.bookings.single.selectedDate;
            let maxDates = 1;
            if(payload.bookingType == 'bundle'){
                dateArray = state.bookings.bundle.selectedDates;
                maxDates = state.bookings.maxDates;
            }
            dateArray.push(payload.date);
            if(dateArray.length > maxDates){dateArray.splice(0,1)}
        },
        removeDate : ( state , payload ) => {
            let dateArray = state.bookings.single.selectedDate;
            if(payload.bookingType == 'bundle'){
                dateArray = state.bookings.bundle.selectedDates;
            }
            dateArray = dateArray.filter((item)=> item !== payload.date)
        },
        changeMonth : ( state , payload ) => {
            let currentMonth = state.bookings.currentMonth;
            currentMonth.add(payload.amount,'month')
        },
        buildMonth : ( state ) => {
            let currentMonth = moment(state.bookings.currentMonth.format('YYYY/MM/DD hh:mm a'), 'YYYY/MM/DD hh:mm a');
            let monthDays = [];
            let firstOfMonth = currentMonth.add(currentMonth.date() * -1 + 1, 'days')
            let startDate = firstOfMonth.add((firstOfMonth.day()) * -1, 'days')
            for (let i = 0; i < 42; i++) {
                if (i == 0) { monthDays.push(moment(startDate.format('YYYY/MM/DD hh:mm a'), 'YYYY/MM/DD hh:mm a')); continue }
                let date = moment(startDate.add(1, 'days').format('YYYY/MM/DD hh:mm a'), 'YYYY/MM/DD hh:mm a')
                monthDays.push(date)
            };
            state.bookings.monthArray = monthDays
        }
    }
 })
 export default store