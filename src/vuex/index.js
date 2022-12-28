import moment from 'moment';
import {createStore } from 'vuex'
 
 
 const store = createStore({
    state () {
        return {
            bookings : {
                calendar : {
                    currentMonth: moment(),
                    monthArray: [],
                    maxDates : 2,
                    selectedDates : [],
                    single : {
                    },
                    bundle : {
                    }
                }
            } 
        }
    },
    mutations: {
        changeMaxDates : (state,newVal) => {state.bookings.calendar.maxDates = newVal},
        addDate : ( state , payload ) => {
            let dateArray = state.bookings.calendar.selectedDates;
            let maxDates = 1;
            if(payload.bookingType == 'bundle'){
                maxDates = state.bookings.calendar.maxDates;
            }
            dateArray.push(payload.date);
            if(dateArray.length > maxDates){dateArray.splice(0,1)}
        },
        removeDate : ( state , payload ) => {
            let dateArray = state.bookings.calendar.selectedDates;
            state.bookings.calendar.selectedDates = dateArray.filter((item)=> item !== payload.date)
        },
        changeMonth : ( state , payload ) => {
            let currentMonth = state.bookings.calendar.currentMonth;
            currentMonth.add(payload.amount,'month')
        },
        buildMonth : ( state ) => {
            let currentMonth = moment(state.bookings.calendar.currentMonth.format('YYYY/MM/DD hh:mm a'), 'YYYY/MM/DD hh:mm a');
            let monthDays = [];
            let firstOfMonth = currentMonth.add(currentMonth.date() * -1 + 1, 'days')
            let startDate = firstOfMonth.add((firstOfMonth.day()) * -1, 'days')
            for (let i = 0; i < 42; i++) {
                if (i == 0) { monthDays.push(moment(startDate.format('YYYY/MM/DD hh:mm a'), 'YYYY/MM/DD hh:mm a')); continue }
                let date = moment(startDate.add(1, 'days').format('YYYY/MM/DD hh:mm a'), 'YYYY/MM/DD hh:mm a')
                monthDays.push(date)
            };
            state.bookings.calendar.monthArray = monthDays
        }
    }
 })
 export default store