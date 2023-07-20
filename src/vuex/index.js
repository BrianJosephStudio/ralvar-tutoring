import moment from "moment";
import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

const store = createStore({
  state() {
    return {
      bookings: {
        booking: {
          classData: {
            classCount: null,
            classFormat: null,
            desiredHourRange: [
              moment("11:00", "HH:mm"),
              moment("20:30", "HH:mm"),
            ],
            dates: [],
          },
          clientData: {
            name: String,
            lastName: String,
            email: String,
            birthDate: String,
            address: String,
          },
        },
        availability: {
          classFormat: {
            format: 60,
            title: "60 Minutes",
          },
          startTime: "12:00",
          endTime: "20:00",
          unavailable: "[]",
        },
        calendar: {
          currentDate: moment().format("YYYY/MM/DD hh:mm a"),
          currentYear: moment().format("YYYY"),
          currentMonth: moment().format("MMMM"),
          monthArray: [],
          selectedDates: [],
          targetDate: null,
          dayWindowPos: [0, 0],
        },
      },
    };
  },
  mutations: {
    changeTargetDate: (state, payload) => {
      state.bookings.calendar.targetDate = payload;
    },
    reposDayWindow: (state, payload) => {
      state.bookings.calendar.dayWindowPos = payload;
    },
    addDate: (state, payload) => {
      let dateArray = state.bookings.calendar.selectedDates;
      let maxDates = 1;
      if (payload.bookingType == "bundle") {
        maxDates = state.bookings.calendar.maxDates;
      }
      dateArray.push(payload.date);
      // if(dateArray.length > maxDates){dateArray.splice(0,1)}
    },
    removeDate: (state, payload) => {
      let dateArray = state.bookings.calendar.selectedDates;
      for (let i = 0; i < dateArray.length; i++) {
        if (payload.date === dateArray[i]) {
          state.bookings.calendar.selectedDates.splice(i, 1);
          break;
        }
      }
    },
    resetDates: (state) => {
      state.bookings.calendar.selectedDates = [];
    },
    changeMonth: (state, payload) => {
      let currentDate = moment(
        state.bookings.calendar.currentDate,
        "YYYY/MM/DD hh:mm a"
      );
      currentDate.add(payload.amount, "month");
      state.bookings.calendar.currentDate =
        currentDate.format("YYYY/MM/DD hh:mm a");
      state.bookings.calendar.currentMonth = currentDate.format("MMMM");
      state.bookings.calendar.currentYear = currentDate.format("YYYY");
    },
    buildMonth: function (state) {
      let currentDate = moment(
        state.bookings.calendar.currentDate,
        "YYYY/MM/DD hh:mm a"
      );
      let monthDays = [];
      let firstOfMonth = currentDate.add(currentDate.date() * -1 + 1, "days");
      let startDate = firstOfMonth.add(firstOfMonth.day() * -1, "days");
      for (let i = 0; i < 42; i++) {
        if (i == 0) {
          monthDays.push(
            moment(startDate.format("YYYY/MM/DD hh:mm a"), "YYYY/MM/DD hh:mm a")
          );
          continue;
        }
        let date = moment(
          startDate.add(1, "days").format("YYYY/MM/DD hh:mm a"),
          "YYYY/MM/DD hh:mm a"
        );
        monthDays.push(date);
      }
      state.bookings.calendar.monthArray = monthDays;
    },
    setClassCount: (state, payload) => {
      state.bookings.booking.classData.classCount = payload.classCount;
      state.bookings.calendar.maxDates = payload.classCount;
    },
    setFormat: (state, payload) => {
      state.bookings.booking.classData.classFormat = payload.minuteCount;
    },
    changeClassFormat: (state, payload) => {
      state.bookings.availability.classFormat.format = payload.format;
      state.bookings.availability.classFormat.title = payload.title;
    },
    changeStartTime: (state, payload) => {
      state.bookings.availability.startTime = payload;
    },
    changeEndTime: (state, payload) => {
      state.bookings.availability.endTime = payload;
    },
    changeUnavailable: (state, payload) => {
      state.bookings.availability.unavailable = JSON.stringify(payload);
      console.log(state.bookings.availability.unavailable);
    },
  },
  actions: {
    changeTimeFilter: ({ state, commit }, payload) => {
      let classFormat = state.bookings.availability.classFormat.format;
      if (classFormat === 45) {
        classFormat = 60;
      }
      const openingTime = moment("12:00", "HH:mm");
      const closingTime = moment("20:00", "HH:mm");
      if (payload.filter == "start") {
        const startTime = moment(payload.value, "HH:mm");
        const endTime = moment(state.bookings.availability.endTime, "HH:mm");
        const minEndTime = startTime.add(classFormat, "minutes");

        if (minEndTime.isAfter(closingTime)) {
          commit(
            "changeStartTime",
            closingTime.subtract(classFormat, "minutes").format("HH:mm")
          );
          commit("changeEndTime", closingTime.format("HH:mm"));
          return;
        } else if (endTime.isBefore(minEndTime)) {
          commit("changeEndTime", minEndTime.format("HH:mm"));
        }
        commit("changeStartTime", payload.value);
      } else if (payload.filter == "end") {
        const startTime = moment(
          state.bookings.availability.startTime,
          "HH:mm"
        );
        const endTime = moment(payload.value, "HH:mm");
        const minStartTime = endTime.subtract(classFormat, "minutes");

        if (minStartTime.isBefore(openingTime)) {
          commit("changeStartTime", openingTime.format("HH:mm"));
          commit(
            "changeEndTime",
            openingTime.add(classFormat, "minutes").format("HH:mm")
          );

          return;
        } else if (startTime.isAfter(minStartTime)) {
          commit("changeStartTime", minStartTime.format("HH:mm"));
        }
        commit("changeEndTime", payload.value);
      }
    },
    changeClassFormat: ({ state, commit }, payload) => {
      commit("changeClassFormat", payload);

      const startTime = moment(state.bookings.availability.startTime, "HH:mm");
      const endTime = moment(state.bookings.availability.endTime, "HH:mm");

      const closingTime = moment("20:00", "HH:mm");
      let classFormat = payload.format;
      if (classFormat === 45) {
        classFormat = 60;
      }

      const minEndTime = startTime.add(classFormat, "minutes");

      if (minEndTime.isAfter(closingTime)) {
        commit("changeEndTime", closingTime.format("HH:mm"));
        commit(
          "changeStartTime",
          closingTime.subtract(classFormat, "minutes").format("HH:mm")
        );
      } else if (endTime.isBefore(minEndTime)) {
        commit("changeEndTime", minEndTime.format("HH:mm"));
      }
    },
    renderDayWindow: ({ state, commit }, payload) => {
      commit("reposDayWindow", payload.position);
      commit("changeTargetDate", payload.date);
    },
  },
  plugins: [
    new VuexPersistence({
      storage: window.localStorage,
      reducer: (state) => ({
        bookings: {
          booking: {
            classData: {
              classCount: state.bookings.booking.classData.classCount,
              classFormat: state.bookings.booking.classData.classFormat,
              desiredHourRange:
                state.bookings.booking.classData.desiredHourRange,
              dates: state.bookings.booking.classData.dates,
            },
          },
          calendar: {
            maxDates: state.bookings.calendar.maxDates,
            selectedDates: state.bookings.calendar.selectedDates,
          },
        },
      }),
    }).plugin,
  ],
});
export default store;
