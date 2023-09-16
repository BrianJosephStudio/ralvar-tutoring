<template>
  <div class="ether">
    <DayWindow />
    <div class="wrapper">
      <div class="filtersWrapper">
        <!-- <div class="filterHeader">
        </div> -->
        <h2>Class Duration</h2>
        <!-- <div class="filterHeader">
        </div> -->
        <h2>Hour Range</h2>
        <ClassFormat></ClassFormat>
        <HourRange></HourRange>
      </div>
      <div class="calendarWrapper">
        <div class="calendarBody">
          <div class="calendarHeader">
            <div class="arrowButton" @click="() => changeMonth(-1)">
              <svg width="12" height="24">
                <polygon points="0 12, 12 0, 12 24" class="arrow" />
              </svg>
            </div>
            <h1>
              {{ $store.state.bookings.calendar.currentMonth }}
              {{ $store.state.bookings.calendar.currentYear }}
            </h1>
            <div class="arrowButton" @click="() => changeMonth(1)">
              <svg width="12" height="24">
                <polygon points="0 0, 12 12, 0 24" class="arrow" />
              </svg>
            </div>
          </div>
          <MonthGrid :monthArray="$store.state.bookings.calendar.monthArray" />
        </div>
        <SidePanel />
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
  // store.dispatch("renderSelectedDates");
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
  const days = [...document.getElementById("monthGrid").children];
  days.forEach((day, index) => {
    if (index < 7) {
      return
    }
    const dataDate = day.dataset.date;
    const date = moment(dataDate);

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
  })
}

onMounted(() => {
  store.commit("resetBookingConfirmation")
  checkDate();
  /**
   * todo: USE AVAILABILITY RESPONSE TO MAKE SURE THE CURRENTLY SELECTED DATES IN SESSIONSTORAGE ALSO ALIGN WITH RECEIVED AVAILABILITY
   */
  store.dispatch("buildMonth");
  // updateAvailability();
  // renderSelectedDates();
});
</script>

<style scoped lang="scss">
.ether {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  margin-top: 2rem;
  overflow: hidden;
}

.wrapper {
  position: relative;
  margin-top: 0rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .filtersWrapper {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 0.5rem;
    width: 100%;

    align-self: center;

    h2 {
      color: black;
      margin: 0;
      padding: 0.6rem 0;
      font-weight: 200;
      font-size: 1.3rem;
    }
  }

  .filterHeader {
    background-color: hsl(260, 40%, 75%);
    border-radius: 2rem 2rem 0 0;
    display: flex;
    place-content: center;
    padding: 1rem 0;
  }



  .calendarWrapper {
    display: flex;
    // align-items: center;
    margin-top: 1rem;
  }

  .calendarHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: hsl(260, 40%, 75%);
    // width: 60rem;
    // padding: 1.5rem 0;
    height: 4rem;
    overflow: hidden;
    border-radius: 2rem 0 0 0;

    h1 {
      margin: 0;
      color: white;
      font-size: 2rem;
    }
  }

  .calendarBody {
    display: flex;
    flex-direction: column;
  }


  .arrowButton {
    display: flex;
    place-content: center;
    align-self: stretch;
    // height: 8rem;
    width: 8rem;
    // margin: 1rem;
    // border-radius: 1rem;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background-color: hsla(0, 0%, 94%, );
    }

    &:hover .arrow {
      fill: hsl(260, 40%, 75%);
    }

    svg {
      align-self: center;
      scale: 0.8;
    }

    .arrow {
      fill: hsl(260, 0%, 100%);
      transition: 0.2s;
    }
  }
}
</style>
