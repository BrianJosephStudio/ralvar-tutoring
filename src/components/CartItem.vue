<template>
  <div class="header">
    <h1>{{ Title }}</h1>
    <div class="removeButton" @click="store.dispatch('toggleSelectedDate', { date: selectedDate })"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import moment from "moment";
import { useStore } from "vuex"

const props = defineProps({
  Title: String,
  selectedDate: String,
});

const store = useStore()

function removeSelectedDate(selectedDate) {
  store.dispatch('toggleSelectedDate', { date: selectedDate })
  // store.dispatch("buildMonth");
}
</script>
<style scoped lang="scss">
.header {
  display: flex;
  background-color: beige;
  justify-content: space-between;
  // align-items: center;
  // justify-content: center;

  h1 {
    // margin: 0;
    margin: 12px auto;
    cursor: default;
  }

  .removeButton {
    height: 100%;
    width: 32px;
    background-color: hsl(49, 94%, 87%);
    cursor: pointer;
  }
}
</style>
