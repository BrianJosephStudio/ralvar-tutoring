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
          confirmed: false,
          classData: {
            count: null,
            format: null,
            dates: [],
            platform: "Skype",
          },
          clientData: {
            name: String,
            lastName: String,
            email: String,
            platformEmail: String,
            birthdate: String,
            city: String,
          },
          paymentData: {
            checkoutPrice: 0,
            clientSecret: undefined,
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
          currentDate: moment().toISOString(),
          currentYear: moment().format("YYYY"),
          currentMonth: moment().format("MMMM"),
          monthArray: [],
          selectedDates: [],
          targetDate: null,
          dayWindowPos: ["50vh", "50vw"],
        },
      },
    };
  },
  mutations: {
    // * General Calendar Logic
    changeMonth: (state, payload) => {
      let currentDate = moment(state.bookings.calendar.currentDate);
      currentDate.add(payload.amount, "month");
      state.bookings.calendar.currentDate = currentDate.toISOString();
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
    },
    reposDayWindow: (state, payload) => {
      state.bookings.calendar.dayWindowPos = payload;
    },
    // * Calendar Selection
    addSelectedDate: (state, payload) => {
      const classFormat = state.bookings.availability.classFormat.format;
      const selDates = [...state.bookings.calendar.selectedDates];
      selDates.push({
        date: payload.date,
        classFormat: classFormat,
      });
      selDates.sort((a, b) => {
        const aMoment = moment(a.date);
        const bMoment = moment(b.date);
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
    // * Side Panel
    recalculateCheckoutPrice: (state) => {
      const classAmount = state.bookings.calendar.selectedDates.length;
      const classFormat = state.bookings.availability.classFormat.format;
      const classPrice = state.bookings.classPrices[classFormat];
      state.bookings.booking.paymentData.checkoutPrice =
        classPrice * classAmount;
    },
    // * Class data(Once selection has been confirmed)
    setClassCount: (state, payload) => {
      state.bookings.booking.classData.count = payload;
    },
    setClassFormat: (state, payload) => {
      state.bookings.booking.classData.format = payload;
    },
    setClassDates: (state, payload) => {
      state.bookings.booking.classData.dates = payload;
    },
    setPlatform: (state, payload) => {
      state.bookings.booking.classData.platform = payload;
    },
    // * Client Data
    setClientData: (state, payload) => {
      state.bookings.booking.clientData.name = payload.name;
      state.bookings.booking.clientData.lastName = payload.lastName;
      state.bookings.booking.clientData.email = payload.email;
      state.bookings.booking.clientData.platformEmail = payload.platformEmail;
      state.bookings.booking.clientData.birthdate = payload.birthdate;
      state.bookings.booking.clientData.city = payload.city;
    },
    resetClientData: (state) => {
      state.bookings.booking.clientData.name = "";
      state.bookings.booking.clientData.lastName = "";
      state.bookings.booking.clientData.email = "";
      state.bookings.booking.clientData.birthdate = "";
      state.bookings.booking.clientData.city = "";
    },
    // * Payments Data
    setClientSecret: (state, payload) => {
      state.bookings.booking.paymentData.clientSecret = payload;
    },
    removeClientSecret: (state) => {
      state.bookings.booking.paymentData.clientSecret = undefined;
    },
    confirmBooking: (state) => {
      state.bookings.booking.confirmed = true;
    },
    resetBookingConfirmation: (state) => {
      state.bookings.booking.confirmed = false;
    },
    resetBookingConfirm: (state) => {
      state.bookings.booking.paymentData.confirmed = false;
    },
  },
  actions: {
    buildMonth: ({ state, commit }) => {
      let currentDate = moment(state.bookings.calendar.currentDate);
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
      commit("changeMonthArray", monthDays);
    },
    toggleSelectedDate: ({ state, commit, dispatch }, payload) => {
      const targetDate = moment(payload.date);
      const selectedDates = state.bookings.calendar.selectedDates;
      let flag = true;
      selectedDates.forEach((selected, index) => {
        const selectedDate = moment(selected.date);
        if (
          selectedDate.year() === targetDate.year() &&
          selectedDate.month() === targetDate.month() &&
          selectedDate.date() === targetDate.date()
        ) {
          //*Target date was found, if targetDate is same as selected date then flag is switched off
          if (
            selectedDate.hour() === targetDate.hour() &&
            selectedDate.minute() === targetDate.minute()
          ) {
            flag = false;
          }
          commit("removeSelectedDate", { index: index });
        }
      });
      if (flag) {
        commit("addSelectedDate", payload);
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
    renderSelectedDates: ({ state }) => {
      const selectedDates = state.bookings.calendar.selectedDates;
      const monthGrid = document.getElementById("monthGrid");
      if (!monthGrid) {
        return;
      }
      const days = [...monthGrid.children];
      console.log(days);

      days.forEach((item, index) => {
        if (index < 7) {
          return;
        }
        item.classList.remove("dayGridActive");
        const itemDate = moment(item.getAttribute("data-date"));

        selectedDates.forEach((sItem) => {
          const sItemDate = moment(sItem.date);

          if (
            itemDate.format("YYYY/MM/DD") === sItemDate.format("YYYY/MM/DD")
          ) {
            item.className = "dayGrid";
            item.classList.add("dayGridActive");
          }
        });
      });
    },
    renderDayWindow: ({ state, commit }, payload) => {
      commit("changeTargetDate", payload.date);
      commit("reposDayWindow", payload.position);
    },
    setClassData: ({ state, commit }) => {
      if (state.bookings.calendar.selectedDates.length === 0) {
        return false;
      }
      commit("setClassCount", state.bookings.calendar.selectedDates.length);
      commit("setClassFormat", state.bookings.availability.classFormat.format);
      commit("setClassDates", state.bookings.calendar.selectedDates);
      return true;
    },
    resetClassData: ({ state, commit }) => {
      commit("setClassCount", null);
      commit("setClassFormat", null);
      commit("setClassDates", []);
      commit("setPlatform", "Skype");
    },
    checkClientSecret: ({ state }) => {
      if (state.bookings.booking.paymentData.clientSecret) {
        return true;
      } else {
        return false;
      }
    },
    resetAllState: ({ commit, dispatch }) => {
      commit("resetDates");
      commit("recalculateCheckoutPrice");
      dispatch("resetClassData");
      commit("resetClientData");
      commit("removeClientSecret");
      commit("resetBookingConfirm");
      dispatch("renderSelectedDates");
    },
  },
  plugins: [
    new VuexPersistence({
      storage: window.sessionStorage,
      reducer: (state) => ({
        bookings: {
          booking: {
            classData: {
              count: state.bookings.booking.classData.count,
              format: state.bookings.booking.classData.format,
              dates: state.bookings.booking.classData.dates,
              platform: state.bookings.booking.classData.platform,
            },
            clientData: {
              name: state.bookings.booking.clientData.name,
              lastName: state.bookings.booking.clientData.lastName,
              email: state.bookings.booking.clientData.email,
              birthday: state.bookings.booking.clientData.birthday,
              city: state.bookings.booking.clientData.city,
            },
            paymentData: {
              checkoutPrice: state.bookings.booking.paymentData.checkoutPrice,
              clientSecret: state.bookings.booking.paymentData.clientSecret,
              confirmed: state.bookings.booking.paymentData.confirmed,
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
