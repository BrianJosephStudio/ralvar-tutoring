<template>
  <transition name="fade">
    <div class="dayWindow" v-if="store.state.bookings.calendar.targetDate !== null" :style="{
      left: `${store.state.bookings.calendar.dayWindowPos[0]}px`,
      top: `${store.state.bookings.calendar.dayWindowPos[1]}px`,
    }">
      <div class="header">
        <h2>
          {{
            moment(
              store.state.bookings.calendar.targetDate,
              "YYYY/MM/DD hh:mm a"
            ).format("dddd MMM Do")
          }}
        </h2>
      </div>
      <div class="hourList">
        <HourItem v-for="item in getHourArray()" :hour="item.hour" :className="item.class" :Title="item.title"
          @click="setActiveDay(item.hour)">
        </HourItem>
        <!-- v-for="hour in getHourArray(date)" :hour="hour" -->
      </div>
    </div>
  </transition>
</template>

<script setup>
import HourItem from "./HourItem.vue";
import { useStore } from "vuex";
import moment from "moment";
import { ref } from "vue";
const store = useStore();
// Props
const props = defineProps({});

// Data
//Methods
function setActiveDay(hourString) {
  let hour = moment(hourString,"HH:mm")
  const targetDate = store.state.bookings.calendar.targetDate
  const targetDateMoment = moment(store.state.bookings.calendar.targetDate,"YYYY/MM/DD hh:mm a")
  targetDateMoment.set("hour",hour.hour()).set("minute",hour.minute())
  store.dispatch("toggleSelectedDate",{date : targetDateMoment.format("YYYY/MM/DD hh:mm a")})
  try {
    const activeDayGrid = document.querySelector(`[data-date="${targetDate}"]`)

    activeDayGrid.classList.add("dayGridActive")
  } catch (e) {
    console.log("something went wrong")
  }
}
function getHourArray() {
  const targetDate = store.state.bookings.calendar.targetDate;
  if (targetDate == null) {
    return;
  }
  const date = moment(targetDate, "YYYY/MM/DD hh:mm a");

  const classFormat = store.state.bookings.availability.classFormat.format;
  const startTime = moment(store.state.bookings.availability.startTime, "HH:mm")
    .set("month", date.month())
    .set("date", date.date());
  const endTime = moment(store.state.bookings.availability.endTime, "HH:mm")
    .set("month", date.month())
    .set("date", date.date());
  const unavailable = JSON.parse(store.state.bookings.availability.unavailable);

  const output = [];
  const hour = date.startOf("day").add(12, "hours");
  const month = date.month();
  const day = date.date();
  const finalStart = moment(date)
    .startOf("day")
    .add(20, "hours")
    .subtract(classFormat, "minutes");
  while (hour.isSameOrBefore(finalStart)) {
    let start = hour.format("HH:mm");
    let end = hour.add(classFormat, "minutes").format("HH:mm");
    let item = { hour: `${start} - ${end}`, class: "available", title: "This time is available" };

    if (day < moment().date() && month < moment().month()) {
      continue
    }
    let startDate = moment(date)
      .set("hour", moment(start, "HH:mm").hour())
      .set("minute", moment(start, "HH:mm").minute());
    let endDate = moment(date)
      .set("hour", moment(end, "HH:mm").hour())
      .set("minute", moment(end, "HH:mm").minute());
    if (unavailable.every((monthObject) => {
      return monthObject.month !== month
    })) {
      if (startDate.isBefore(startTime) || endDate.isAfter(endTime)) {
        item.class = "partiallyAvailable";
        item.title = "Time is available but it's outside of your hour range."
      }
    }
    unavailable.forEach((monthObject) => {
      if (monthObject.month === month) {
        if (
          monthObject.items.every((dayObject) => {
            return dayObject.day !== day;
          })
        ) {
          if (startDate.isBefore(startTime) || endDate.isAfter(endTime)) {
            item.class = "partiallyAvailable";
            item.title = "Time is available but it's outside of your hour range."
          }
        } else {
          monthObject.items.forEach((dayObject) => {
            if (dayObject.day === day) {
              if (!dayObject.available && !dayObject.partialAvailability) {
                item.class = "unavailable";
                item.title = "This time is not available"
              } else {
                dayObject.items.forEach((hourObject) => {
                  if (moment(hourObject.time, "HH:mm").set("month", date.month()).set("date", date.date()).isBefore(moment())) {
                    item.class = "unavailable";
                    item.title = "This time already passed"
                  } else if (hourObject.time === start) {
                    if (hourObject.available) {
                      if (moment(hourObject.time, "HH:mm").set("month", date.month()).set("date", date.date()).isBefore(startTime)) {
                        item.class = "partiallyAvailable";
                        item.title = "Time is available but it's outside of your hour range."
                      } else {
                        item.class = "partiallyAvailable";
                        item.title = "This time is available for a shorter class."
                      }
                    } else {
                      item.class = "unavailable";
                      item.title = "This time is not available"
                    }
                  }
                });
              }
            }
          });
        }
      }
    });

    output.push(item);
    hour.add(-(classFormat - 30), "minutes");
  } //while (hour.format("HH") <= 20 - (classFormat / 60));
  return output;
}
</script>

<style scoped lang="scss">
@mixin common {
  border-radius: 2vw;
}

.dayWindow {
  position: absolute;
  display: flex;
  flex-direction: column;
  place-content: center;
  // margin: 20px;
  @include common;
  min-width: 6vw;
  width: 14vw;
  border-style: solid;
  border-color: hsl(0, 0%, 93%);
  border-width: 2px;
  height: 24vw;
  background-color: rgb(255, 255, 255);
  overflow: hidden;
  z-index: 3;
  transition: 0.3s ease-out;
  box-shadow: -10px 8px 15px 0px hsl(0, 0%, 80%);
  // box-shadow: 3px 3px 12px 0px hsl(0, 0%, 75%);

  .header {
    display: flex;
    flex-direction: column;
    place-content: center;
    background-color: hsl(0, 0%, 75%);
    height: 20%;
    background-color: hsl(260, 40%, 75%);
    width: inherit;
    min-width: 150px;
    word-wrap: break-word;

    h2 {
      color: black;
      // font-family: Arial, Helvetica, sans-serif;
      font-weight: 300;
      font-size: 1.2vw;
      color: hsl(0, 0%, 93%);
    }
  }

  .hourList {
    background-color: hsl(0, 0%, 93%);
    overflow-y: scroll;
    // cursor: pointer;
    min-width: 150px;
    width: inherit;

    h2 {
      color: black;
    }
  }
}

.fade-enter-active {
  transition: 0.3s ease-out;
  transition-delay: 0.15s;
}

.fade-leave-active {
  transition: 0.2s ease-in;
}

.fade-enter-from {
  opacity: 0;
  scale: 0;
  // transform: translateX(-120px)
}

.fade-leave-to {
  opacity: 0;
  scale: 0;
  // transform: translateX(-120px)
}

/* width */
::-webkit-scrollbar {
  width: 2vw;
}

/* Track */
::-webkit-scrollbar-track {
  background: hsl(0, 0%, 96%);
  border-radius: 0px 0px 2vw 0px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: hsl(0, 0%, 87%);
  border-radius: 0px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: hsl(0, 0%, 90%);
}
</style>
