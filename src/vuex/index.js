import moment from "moment";
import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import { dayGridType } from "../modules/static.js";

const store = createStore({
  state() {
    return {
      bookings: {
        classPrices: {
          30: 10,
          45: 16,
          60: 18,
          90: 26,
        },
        booking: {
          classData: {
            count: null,
            format: null,
            dates: [],
          },
          clientData: {
            name: String,
            lastName: String,
            email: String,
            birthDate: String,
            address: String,
          },
          paymentData: {
            checkoutPrice: 0,
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
    //General Calendar Logic
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
    changeMonthArray: (state, payload) => {
      state.bookings.calendar.monthArray = payload;
    },
    changeTargetDate: (state, payload) => {
      state.bookings.calendar.targetDate = payload;
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
    reposDayWindow: (state, payload) => {
      state.bookings.calendar.dayWindowPos = payload;
    },
    //Calendar Selection
    addSelectedDate: (state, payload) => {
      const classFormat = state.bookings.availability.classFormat.format;
      const selDates = [...state.bookings.calendar.selectedDates];
      selDates.push({
        date: payload.date,
        classFormat: classFormat,
      });
      selDates.sort((a, b) => {
        const aMoment = moment(a.date, "YYYY/MM/DD hh:mm a");
        console.log(aMoment);
        const bMoment = moment(b.date, "YYYY/MM/DD hh:mm a");
        console.log(bMoment);
        console.log(aMoment.isBefore(bMoment));
        console.log(aMoment.isAfter(bMoment));
        if (aMoment.isBefore(bMoment)) {
          return -1;
        } else if (aMoment.isAfter(bMoment)) {
          return 1;
        } else {
          return 0;
        }
      });
      state.bookings.calendar.selectedDates = selDates;
    },
    removeSelectedDate: (state, payload) => {
      state.bookings.calendar.selectedDates.splice(payload.index, 1);
    },
    resetDates: (state) => {
      state.bookings.calendar.selectedDates = [];
    },
    //Side Panel
    recalculateCheckoutPrice: (state) => {
      const classAmount = state.bookings.calendar.selectedDates.length;
      const classFormat = state.bookings.availability.classFormat.format;
      const classPrice = state.bookings.classPrices[classFormat];
      state.bookings.booking.paymentData.checkoutPrice =
        classPrice * classAmount;
    },
    //Class data(Once selection has been confirmed)
    setClassCount: (state, payload) => {
      state.bookings.booking.classData.count = payload;
    },
    setClassFormat: (state, payload) => {
      state.bookings.booking.classData.format = payload;
    },
    setClassDates: (state, payload) => {
      state.bookings.booking.classData.dates = payload;
      console.log(state.bookings.booking.classData.dates);
    },
  },
  actions: {
    buildMonth: ({ state, commit }) => {
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
      // console.log(monthDays)
      commit("changeMonthArray",monthDays);
    },
    toggleSelectedDate: ({ state, commit, dispatch }, payload) => {
      const targetDate = moment(payload.date, "YYYY/MM/DD hh:mm a");
      const selectedDates = state.bookings.calendar.selectedDates;
      let i;
      i = selectedDates.findIndex((selDate) => {
        selDate = moment(selDate.date, "YYYY/MM/DD hh:mm a");
        if (
          selDate.year() === targetDate.year() &&
          selDate.month() === targetDate.month() &&
          selDate.date() === targetDate.date() &&
          (selDate.hour() !== targetDate.hour() ||
            selDate.minute() !== targetDate.minute())
        ) {
          return true;
        }
      });
      if (i !== -1) {
        commit("removeSelectedDate", { index: i });
      }

      i = selectedDates.findIndex((selDate) => {
        console.log(payload.date);
        console.log(selDate.date);
        return selDate.date === payload.date;
      });
      if (i === -1) {
        commit("addSelectedDate", payload);
      } else {
        commit("removeSelectedDate", { index: i });
      }
      commit("recalculateCheckoutPrice");
      dispatch("buildMonth");
    },
    changeTimeFilter: ({ state, commit, dispatch }, payload) => {
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
      dispatch("buildMonth");
    },
    changeClassFormat: ({ state, commit, dispatch }, payload) => {
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
      dispatch("buildMonth");
    },
    renderDayWindow: ({ state, commit }, payload) => {
      commit("reposDayWindow", payload.position);
      commit("changeTargetDate", payload.date);
    },
    setClassData: ({ state, commit }) => {
      commit("setClassCount", state.bookings.calendar.selectedDates.length);
      commit("setClassFormat", state.bookings.availability.classFormat.format);
      commit("setClassDates", state.bookings.calendar.selectedDates);
    },
    resetClassData: ({ state, commit }) => {
      commit("setClassCount", null);
      commit("setClassFormat", null);
      commit("setClassDates", []);
    },
  },
  plugins: [
    new VuexPersistence({
      storage: window.localStorage,
      reducer: (state) => ({
        bookings: {
          booking: {
            classData: {
              count: state.bookings.booking.classData.count,
              format: state.bookings.booking.classData.format,
              dates: state.bookings.booking.classData.dates,
            },
          },
          calendar: {
            selectedDates: state.bookings.calendar.selectedDates,
          },
        },
      }),
    }).plugin,
  ],
});
export default store;
