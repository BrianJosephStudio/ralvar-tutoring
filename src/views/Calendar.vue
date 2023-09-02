<template>
  <div class="wrapper">
    <DayWindow />
    <SidePanel />
    <div style="display: flex">
      <div class="filterWrapper">
        <h2>Class Duration</h2>
        <ClassFormat></ClassFormat>
      </div>
      <div class="filterWrapper">
        <h2>Hour Range</h2>
        <HourRange></HourRange>
      </div>
    </div>
    <div class="calendarHeader">
      <h1>
        {{ $store.state.bookings.calendar.currentMonth }}
        {{ $store.state.bookings.calendar.currentYear }}
      </h1>
    </div>
    <div style="display: flex">
      <div class="calendarLayout">
        <div class="arrowButton" @click="() => changeMonth(-1)">
          <svg width="12" height="24">
            <polygon points="0 12, 12 0, 12 24" class="arrow" />
          </svg>
        </div>
        <MonthGrid :monthArray="$store.state.bookings.calendar.monthArray" />
        <div class="arrowButton" @click="() => changeMonth(1)">
          <svg width="12" height="24">
            <polygon points="0 0, 12 12, 0 24" class="arrow" />
          </svg>
        </div>
      </div>

      <!-- <div class="dayWindows">
        <DayWindow v-for="date in this.$store.state.bookings.calendar.selectedDates" :date="date"
        :classFormat="this.$store.state.bookings.booking.classData.classFormat" />
      </div> -->
    </div>
  </div>
</template>
<script setup>
/* Imports */
import mitt from "mitt";
import { useRouter } from "vue-router";
import ClassFormat from "../components/ClassFormat.vue";
import HourRange from "../components/HourRange.vue";
import MonthGrid from "../components/MonthGrid.vue";
import DayWindow from "../components/DayWindow.vue";
import SidePanel from "../components/SidePanel.vue";
import { useStore } from "vuex";
import { provide, onMounted, onUpdated, ref } from "vue";
import moment from "moment";
import { dayGridType } from "../modules/static";
import { checkDate } from "../modules/server.js";

/* Props */
const props = defineProps({
  selectableDates: Number,
});
/* Data */
const store = useStore();
const router = useRouter();

onUpdated(() => {
  store.dispatch("renderSelectedDates");
});

/* Calendar Events Handling */

const emitter = mitt();
provide("emitter", emitter);

emitter.on("closeMenus", () => {
  store.commit("changeTargetDate", null);
});
emitter.on("monthChange", () => {
  // renderSelectedDates();
});
emitter.on("selectDate", () => {
  // renderSelectedDates();
});
emitter.on("updateAvailability", (event) => {
  updateAvailability();
});

/* Methods */
function changeMonth(n) {
  store.commit("changeMonth", { amount: n });
  store.dispatch("buildMonth");
  // emitter.emit("monthChange");
}
/*
function renderSelectedDates() {
  let selectedDates = store.state.bookings.calendar.selectedDates;
  let days = [...document.getElementById("monthGrid").children];

  days.forEach((item) => {
    item.classList.remove("dayGridActive");
    const itemDate = moment(item.getAttribute("data-date"), "YYYY/MM/DD hh:mm a")

    selectedDates.forEach((sItem) => {
      const sItemDate = moment(sItem.date, "YYYY/MM/DD hh:mm a")

      if (itemDate.format("YYYY/MM/DD") === sItemDate.format("YYYY/MM/DD")) {
        item.className = "dayGrid";
        item.classList.add("dayGridActive");
      }
    });
  });
}
*/

function updateAvailability() {
  // const unavailable = JSON.parse(store.state.bookings.availability.unavailable);

  const days = [...document.getElementById("monthGrid").children];
  for (const day of days) {
    if (day.id === "dayName") {
      continue;
    }
    const dataDate = day.dataset.date;
    const date = moment(dataDate, "YYYY/MM/DD hh:mm a");

    const gridType = dayGridType(date);

    day.dataset.av = gridType.available;
    day.className = gridType.class;

    if (date.weekday() == 0 || date.isBefore(moment())) {
      day.removeAttribute("title");
    } else if (gridType.available) {
      day.title = "availability";
    } else if (!gridType.partialAvailability) {
      day.title = "Fully Booked";
    } else if (gridType.partialAvailability) {
      day.title = "Availability for different class length or time range";
    }
  }
}

onMounted(() => {
  store.dispatch("buildMonth");
  checkDate();
  updateAvailability();
  // renderSelectedDates();
});
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  margin-top: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  .filterWrapper {
    display: flex;
    flex-direction: column;

    h2 {
      color: black;
      margin: 0;
      font-size: 1.3vw;
    }
  }

  .calendarHeader {
    margin-top: 1vw;
    background-color: hsl(260, 40%, 75%);
    width: 40vw;
    padding: 12px;
    border-radius: 1.5vw 1.5vw 0 0;
  }

  .calendarLayout {
    display: flex;
    align-items: center;
  }

  h1 {
    margin: auto;
  }

  .arrowButton {
    display: flex;
    place-content: center;
    background-color: hsl(0, 0%, 93%);
    margin: 10px;
    height: 8vw;
    width: 1.6vw;
    border-radius: 0.6vw;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background-color: hsl(0, 0%, 87%);
    }

    &:hover .arrow {
      fill: hsl(0, 0%, 50%);
    }

    svg {
      align-self: center;
      scale: 0.8;
    }

    .arrow {
      fill: hsl(0, 0%, 80%);
      transition: 0.2s;
    }
  }
}
</style>
