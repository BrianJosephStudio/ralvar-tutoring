<template>
  <div :id="props.class" :class="props.class" :data-date="dataDate" :data-av="props.available"
    :data-partial="props.partial" @click="(event) => handleClick(event)">
    <h1 ref="grid">{{ title }}</h1>
  </div>
</template>

<script setup>
/* Imports */
import { ref, onUpdated, inject } from "vue";
import { useStore } from "vuex";
/* Props */
const props = defineProps({
  available: Boolean,
  partial: Boolean,
  day: Object,
  title: String,
  class: String,
  type: String,
  selectableDates: Number,
  dataDate: String,
  id: Number,
});
/* Data */
const store = useStore();
const emitter = inject("emitter");
/* Functions */

function getDayGridPosition(event) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const innerHeight = window.innerHeight;
  const DayWindowHeight = window.innerWidth * 0.24;
  const top = Math.min(rect.top, innerHeight - DayWindowHeight - 6);
  const left = rect.left + (window.innerWidth * 0.4) / 7;

  return [left, top];
}
function clickOut() {
  document.removeEventListener("click", clickOut);
  emitter.emit("closeMenus");
}
function handleClick(event) {
  event.stopPropagation();
  emitter.emit("closeMenus");
  const target = event.currentTarget
  if (target.dataset.av === "false" && target.dataset.partial === "false") {
    return;
  }
  store.dispatch("renderDayWindow", {
    date: props.dataDate,
    position: getDayGridPosition(event),
  });
  document.addEventListener("click", clickOut);
}

/* Mounted */
// const grid = ref(null)
// onUpdated(() => {
//     grid.value.parentElement.classList.remove('dayGridActive')
// })
</script>

<style scoped lang="scss">
@mixin grid {
  display: flex;
  flex-direction: column;
  place-content: center;
  padding: 0px;
  margin: 1px;
  width: calc(40vw / 7 - 6px);
  height: calc(25vw / 7 - 6px);
  border-radius: 0.6vw;
  position: relative;
  background: transparent;
}

@mixin dayFontSize {
  font-size: 1.5vw;
}

@mixin availableColor {
  color: hsl(144, 70%, 40%);
}

@mixin otherMonth_availableColor {
  color: hsl(144, 35%, 75%);
}

@mixin unavailableColor {
  color: hsl(0, 78%, 72%);
}

@mixin otherMonth_unavailableColor {
  color: hsl(0, 78%, 90%);
}

@mixin partialColor {
  color: hsl(51, 69%, 70%);
}

@mixin otherMonth_partialColor {
  color: hsl(51, 69%, 58%);
}

@mixin pastDateColor {
  color: hsl(0, 0%, 75%)
}

@mixin pastMonthColor {
  color: hsl(0, 0%, 85%)
}

@mixin gridHov {
  background-color: hsl(260, 40%, 85%);
}

.dayName {
  @include grid;

  h1 {
    font-size: 1.1vw;
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

  &:hover {
    background-color: hsl(260, 40%, 75%);
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
    margin: 0px;
  }
}
</style>
