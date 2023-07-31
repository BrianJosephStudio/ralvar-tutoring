import moment from "moment";
import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import { dayGridType } from "../modules/static.js";

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
    addSelectedDate: (state, payload) => {
      const classFormat = state.bookings.availability.classFormat.format;
      state.bookings.calendar.selectedDates.push({
        date: payload.date,
        classFormat: classFormat,
      });
    },
    removeSelectedDate: (state, payload) => {
      state.bookings.calendar.selectedDates.splice(payload.index, 1);
    },
    reposDayWindow: (state, payload) => {
      state.bookings.calendar.dayWindowPos = payload;
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
      const monthDays = [];
      let firstOfMonth = currentDate.startOf("month").subtract(1, "day");
      let startDate = firstOfMonth.subtract(firstOfMonth.day(), "days");
      for (let i = 0; i < 42; i++) {
        if (i !== 0) {
          startDate.add(1, "days");
        }
        const date = { date: moment(startDate) };
        const dayGrid = dayGridType(date.date);
        const monthDay = Object.assign({}, date, dayGrid);
        // monthDay : {date,available,partialAvailability,class,active}

        monthDays.push(monthDay);
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
      state.bookings.availability.unavailable = JSON.stringify(
        payload,
        null,
        2
      );
      // console.log(state.bookings.availability.unavailable);
    },
  },
  actions: {
    toggleSelectedDate: ({ state, commit }, payload) => {
      const m = moment(payload.date, "YYYY/MM/DD hh:mm a");
      const selectedDates = state.bookings.calendar.selectedDates;

      const exists = selectedDates.findIndex((selDate) => {
        selDate = moment(selDate.date, "YYYY/MM/DD hh:mm a");
        if (
          selDate.year() === m.year() &&
          selDate.month() === m.month() &&
          selDate.date() === m.date()
        ) {
          return true;
        }
      });
      console.log(exists);
      if (exists !== -1) {
        selectedDates.splice(exists, 1);
      }

      const i = selectedDates.findIndex((date) => date.date === payload.date);
      if (i === -1) {
        commit("addSelectedDate", payload);
      } else {
        commit("removeSelectedDate", { index: i });
      }
      console.log(JSON.stringify(state.bookings.calendar.selectedDates));
    },
    changeTimeFilter: ({ state, commit }, payload) => {
      commit("resetDates");
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
      commit("resetDates");
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
