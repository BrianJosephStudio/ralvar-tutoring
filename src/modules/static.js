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
  const output = { available: true };
  const unavailable = JSON.parse(store.state.bookings.availability.unavailable);

  const dayDate = day.date();
  const dayMonth = day.month();

  for (const monthObject of unavailable) {
    if (day.isBefore(moment())) {
      output.available = false;
    } else if (dayMonth === monthObject.month) {
      for (const dayObject of monthObject.items) {
        if (dayObject.day == dayDate) {
          if (!dayObject.available) {
            output.available = false;
          } else {
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
      output.class = "otherMonth";
    } else if (!output.available) {
      output.class = "otherMonth_unavailable";
    }
  } else if (day.weekday() == 0) {
    output.class = "weekend";
    output.available = false;
  } else if (output.available) {
    output.class = "dayGrid";
  } else if (!output.available) {
    output.class = "dayGrid_unavailable";
  }
  return output;
}
