import moment from "moment";
import store from "../vuex";

export const classFormats = [
  {
    title: "30 Minutes",
    format: 30,
    index: 0,
  },
  {
    title: "45 Minutes",
    format: 45,
    index: 1,
  },
  {
    title: "60 Minutes",
    format: 60,
    index: 2,
  },
  {
    title: "90 Minutes",
    format: 90,
    index: 3,
  },
];
export const getHourArray = (filter, classFormat) => {
  if (classFormat === 45) {
    classFormat = 60;
  }
  const date = moment();
  const startTime = filter === "start" ? 12 * 60 : 12 * 60 + classFormat;
  const hour = date.startOf("day").add(startTime, "minutes");
  const closingTime = "20:00";
  const maxStartTime = moment(closingTime, "HH:mm").subtract(
    classFormat,
    "minutes"
  );
  const output = [];
  do {
    let item = hour.format("HH:mm");
    output.push(item);
    hour.add(30, "minutes");
  } while (
    hour.isSameOrBefore(
      filter === "start" ? maxStartTime : moment(closingTime, "HH:mm")
    )
  );
  return output;
};
/** Takes a date as an input and returns an object with className and availability
 * called during v-for loop to define the class of the v-for isntance
 * @param {Object} day moment.js instance
 */
export function dayGridType(day) {
  day = moment(day, "YYYY/MM/DD hh:mm a");
  const output = { available: true, class: undefined };
  const unavailable = JSON.parse(store.state.bookings.availability.unavailable);

  const dayDate = day.date();
  const dayMonth = day.month();

  if (day.isBefore(moment()) && day.weekday() !== 0) {
    output.available = false;
    if (
      dayMonth ===
      moment(store.state.bookings.calendar.currentMonth, "MMMM").month()
    ) {
      output.class = "pastDate";
    } else if (
      dayMonth <
      moment(store.state.bookings.calendar.currentMonth, "MMMM").month()
    ) {
      output.class = "pastMonth";
    } else {
      if (day.isBefore(moment())) {
        output.class = "pastMonth";
      } else {
        output.class = "otherMonth_available"; //This should never trigger since only past days should be here
      }
    }
    return output;
  }
  for (const monthObject of unavailable) {
    if (dayMonth === monthObject.month) {
      for (const dayObject of monthObject.items) {
        if (dayObject.day == dayDate) {
          if (!dayObject.available && dayObject.partialAvailability) {
            output.available = false;
            output.partialAvailability = true;
          } else if (!dayObject.available && !dayObject.partialAvailability) {
            output.available = false;
            output.partialAvailability = false;
          }
        }
      }
    }
  }
  let currentMonth = store.state.bookings.calendar.currentMonth;
  if (day.format("MMMM") != currentMonth) {
    if (day.weekday() == 0) {
      output.available = false;
      output.class = "otherMonthWeekend";
    } else if (output.available) {
      output.class = "otherMonth_available";
    } else if (!output.available) {
      if (output.partialAvailability) {
        output.class = "otherMonth_partial";
      } else {
        output.class = "otherMonth_unavailable";
      }
    }
  } else if (day.weekday() == 0) {
    output.class = "weekend";
    output.available = false;
  } else if (output.available) {
    output.class = "dayGrid";
  } else if (!output.available) {
    if (output.partialAvailability) {
      output.class = "dayGrid_partial";
    } else {
      output.class = "dayGrid_unavailable";
    }
  }
  return output;
}
