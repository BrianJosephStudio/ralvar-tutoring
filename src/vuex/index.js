import moment from 'moment';
import {createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'


 const store = createStore({
    state () {
        return {
            bookings : {
                booking : {
                    classData: {
                        classCount: null,
                        classFormat: null,
                        desiredHourRange: [moment('11:00','HH:mm'),moment('20:30','HH:mm')],
                        dates: []
                    },
                    clientData: {
                        name: String,
                        lastName: String,
                        email: String,
                        birthDate: String,
                        address: String,
                    }
                },
                calendar : {
                    currentDate: moment().format('YYYY/MM/DD hh:mm a'),
                    currentYear: moment().format('YYYY'),
                    currentMonth: moment().format('MMMM'),
                    monthArray: [],
                    maxDates : 1,
                    selectedDates : []
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
            for(let i = 0; i < dateArray.length; i++){
                if(payload.date === dateArray[i]){state.bookings.calendar.selectedDates.splice(i,1); break;}
            }
        },
        resetDates : ( state ) => {
            state.bookings.calendar.selectedDates = [];
        },
        changeMonth : ( state , payload ) => {
            let currentDate = moment(state.bookings.calendar.currentDate,'YYYY/MM/DD hh:mm a');
            currentDate.add(payload.amount,'month')
            state.bookings.calendar.currentDate = currentDate.format('YYYY/MM/DD hh:mm a')
            state.bookings.calendar.currentMonth = currentDate.format('MMMM')
            state.bookings.calendar.currentYear = currentDate.format('YYYY')
        },
        buildMonth : function ( state )  {
            let currentDate = moment(state.bookings.calendar.currentDate,'YYYY/MM/DD hh:mm a');
            let monthDays = [];
            let firstOfMonth = currentDate.add(currentDate.date() * -1 + 1, 'days')
            let startDate = firstOfMonth.add((firstOfMonth.day()) * -1, 'days')
            for (let i = 0; i < 42; i++) {
                if (i == 0) { monthDays.push(moment(startDate.format('YYYY/MM/DD hh:mm a'), 'YYYY/MM/DD hh:mm a')); continue }
                let date = moment(startDate.add(1, 'days').format('YYYY/MM/DD hh:mm a'), 'YYYY/MM/DD hh:mm a')
                monthDays.push(date)
            };
            state.bookings.calendar.monthArray = monthDays
        },
        setClassCount: ( state, payload ) =>{
            state.bookings.booking.classData.classCount = payload.classCount
            state.bookings.calendar.maxDates = payload.classCount
        },
        setFormat : ( state , payload ) => {
            state.bookings.booking.classData.classFormat = payload.minuteCount
        }
    },
    plugins: [
        new VuexPersistence({
            storage: window.localStorage,
            reducer: state => ({
                    bookings: {
                        booking : {
                            classData : {
                                classCount: state.bookings.booking.classData.classCount,
                                classFormat: state.bookings.booking.classData.classFormat,
                                desiredHourRange: state.bookings.booking.classData.desiredHourRange,
                                dates: state.bookings.booking.classData.dates
                            }
                        },
                        calendar : {
                            maxDates : state.bookings.calendar.maxDates,
                            selectedDates : state.bookings.calendar.selectedDates
                        }
                    }
            })
        }).plugin
    ]
 })
 export default store