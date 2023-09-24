<template>
  <div ref="dayGrid" :id="props.class" :class="props.classname" :data-date="dataDate" :data-av="props.available"
    :data-partial="props.partial" @click="(event) => handleClick(event)">
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup>
/* Imports */
import { ref, onUpdated, onMounted, inject, nextTick } from "vue";
import { useStore } from "vuex";
/* Props */
const props = defineProps({
  available: Boolean,
  partial: Boolean,
  day: Object,
  Active: Boolean,
  title: String,
  classname: String,
  type: String,
  selectableDates: Number,
  dataDate: String,
  id: Number,
});
/* Data */
const store = useStore();
const emitter = inject("emitter");
/* Functions */
const dayGrid = ref(null)



function getDayGridPosition(event) {
  const offset = document.querySelector(".navBar").getBoundingClientRect().height
  const dayGrid = event.currentTarget;
  const dayRect = dayGrid.getBoundingClientRect();
  const innerHeight = window.innerHeight;
  const dayWindow = document.querySelector(".dayWindow")
  const dayWindowHeight = parseInt(getComputedStyle(dayWindow).getPropertyValue("height"))
  const dayWindowWidth = parseInt(getComputedStyle(dayWindow).getPropertyValue("width"))
  const monthGrid = document.querySelector(".monthGrid")
  const monthRect = monthGrid.getBoundingClientRect()

  const margin = 12;

  const top = Math.min(dayRect.top - offset, innerHeight - dayWindowHeight - offset - margin);
  // const left = dayRect.right + margin;
  let left
  if (dayRect.right + dayWindowWidth > monthRect.right) {
    left = dayRect.left - dayWindowWidth - margin
  } else {
    left = dayRect.right + margin
  }

  return [left, top];
}
function clickOut() {
  document.removeEventListener("click", clickOut);
  emitter.emit("closeMenus");
}
function handleClick(event) {
  // console.log(store.state.bookings.availability.unavailable)
  event.stopPropagation();
  emitter.emit("closeMenus");
  const target = event.currentTarget
  if (!eval(target.dataset.av) && !eval(target.dataset.partial)) {
    return;
  }

  store.commit("changeTargetDate", props.dataDate);
  nextTick(() => {
    store.commit("reposDayWindow", getDayGridPosition(event));
  })
  // store.dispatch("renderDayWindow", {
  //   date: props.dataDate,
  //   position: getDayGridPosition(event),
  // });
  document.addEventListener("click", clickOut);
}

/* Mounted */

</script>

<style scoped lang="scss">
@mixin grid {
  display: flex;
  flex-direction: column;
  place-content: center;
  padding: 0px;
  // margin: 1px;
  width: 7rem;
  height: 4rem;
  border-radius: 0.6rem;
  position: relative;

  // background: transparent;
  h1 {
    margin: 0px;

  }
}

@mixin dayFontSize {
  font-size: 1.8rem;
}

@mixin availableColor {
  color: hsl(144, 0%, 16%);
  font-weight: 400;
}

@mixin otherMonth_availableColor {
  color: hsl(144, 0%, 50%);
  font-weight: 200;
}

@mixin unavailableColor {
  color: hsl(0, 0%, 16%);
  text-decoration: line-through;
  text-decoration-thickness: 1px;
  font-weight: 200;
}

@mixin otherMonth_unavailableColor {
  color: hsl(0, 0%, 80%);
  text-decoration: line-through;
  text-decoration-thickness: 1px;
  font-weight: 200;
}

@mixin partialColor {
  color: hsl(51, 69%, 70%);
}

@mixin otherMonth_partialColor {
  color: hsl(51, 69%, 58%);
}

@mixin pastDateColor {
  color: hsl(0, 0%, 75%);
  text-decoration: line-through;
  text-decoration-thickness: 1px;
  font-weight: 200;
}

@mixin pastMonthColor {
  color: hsl(0, 0%, 85%);
  text-decoration: line-through;
  text-decoration-thickness: 1px;
  font-weight: 200;
}

@mixin gridHov {
  background-color: hsl(260, 40%, 85%);
}

.dayName {
  // @include grid;

  h1 {
    font-size: 1.5rem;
    color: black;
    padding-top: 1rem;
  }
}

.dayGrid {
  @include grid;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    @include gridHov;
  }

  h1 {
    @include dayFontSize;
    @include availableColor;
    margin: 0px;
  }
}

.dayGrid_unavailable {
  @include grid;
  background: transparent;

  h1 {
    @include dayFontSize;
    @include unavailableColor;
  }
}

.dayGrid_partial {
  @include grid;
  background: transparent;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    @include gridHov;
  }

  h1 {
    @include dayFontSize;
    @include partialColor;
  }

}

.dayGridActive {
  cursor: pointer;
  background-color: hsl(260, 40%, 75%);

  h1 {
    color: hsl(0, 0%, 100%) !important;
  }
}

.weekend {
  @include grid;

  h1 {
    @include unavailableColor;
    @include dayFontSize;
    margin: 0px;
  }
}

.pastDate {
  @include grid;

  h1 {
    @include dayFontSize;
    @include pastDateColor;
  }
}

.pastMonth {
  @include grid;
  // opacity: 0.2;

  h1 {
    @include dayFontSize;
    @include pastMonthColor;
  }
}

.otherMonth_available {
  @include grid;
  cursor: pointer;
  // opacity: 0.2;

  &:hover {
    @include gridHov;
  }

  h1 {
    @include dayFontSize;
    @include otherMonth_availableColor;
  }
}

.otherMonth_unavailable {
  @include grid;
  // opacity: 0.2;

  h1 {
    @include dayFontSize;
    @include otherMonth_unavailableColor;
  }
}

.otherMonth_partial {
  @include grid;

  h1 {
    @include dayFontSize;
    @include otherMonth_partialColor;
  }
}

.otherMonthWeekend {
  @include grid;
  // opacity: 0.2;

  h1 {
    @include otherMonth_unavailableColor;
    @include dayFontSize;
  }
}

@media (max-width: 660px) {
  .daygrid {
    width: 1rem;
    background-color: red;
  }

}
</style>
