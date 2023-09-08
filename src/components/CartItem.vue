<template>
  <div class="itemContainer">

    <div class="header">
      <h1>{{ Title }}</h1>
    </div>
    <div class="removeButton" @click="store.dispatch('toggleSelectedDate', { date: selectedDate })">
      <h1>x</h1>
    </div>
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
.itemContainer {
  display: flex;
  // background-color: hsl(0, 0%, 98%);


  .header {
    display: flex;
    justify-content: center;
    padding: 1rem;
    flex-grow: 1;
    border: solid hsl(0, 0%, 86%);
    border-width: 0 0 1px 0;

    h1 {
      // margin: 0;
      margin: 0;
      font-size: 1.6rem;
      cursor: default;
      font-weight: 400;
    }

  }

  .removeButton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    // background-color: hsl(260, 40%, 75%);
    // border-radius: 2rem;
    cursor: pointer;

    h1 {
      font-weight: 200;
      font-size: 1rem;
      color: hsl(0, 0%, 8%);
    }

    &:hover {
      background-color: hsl(354, 100%, 69%);

      h1 {
        font-size: 1rem;
        color: hsl(0, 0%, 100%);
      }

    }
  }
}
</style>
