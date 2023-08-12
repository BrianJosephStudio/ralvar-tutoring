<template>
  <div class="sidePanel" :style="togglePos()">
    <div>
      <h1>{{store.state.bookings.calendar.selectedDates.length}} {{ store.state.bookings.calendar.selectedDates.length > 1 ? "classes" : "class" }}</h1>
    </div>
    <div class="itemsBox">
      <CartItem
        v-for="selectedDate of store.state.bookings.calendar.selectedDates"
        :Title="getItemName(selectedDate)" :selectedDate="selectedDate.date"
      ></CartItem>
    </div>
    <div class="footer">
      <h1>{{ store.state.bookings.booking.paymentData.checkoutPrice }}€</h1>
      <div class="continueButton">
        <h1>Continue</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { inject, ref } from "vue";
import CartItem from "./CartItem.vue";
import moment from "moment";

const props = defineProps({});
const store = useStore();
const emitter = inject("emitter");

function togglePos() {
  const selDates = store.state.bookings.calendar.selectedDates;
  return selDates.length ? { right: "0vw" } : { right: "-25vw" };
}
function getItemName(selectedDate) {
  const date = moment(selectedDate.date,"YYYY/MM/DD hh:mm a");
  const { classFormat } = selectedDate || null;

  const start = date.format("HH:mm");
  date.add(classFormat, "minutes");
  const end = date.format("HH:mm");

  const title = `${date.format("MMM D")} | ${start} - ${end}`;
  return title;
}
</script>

<style scoped lang="scss">
.sidePanel {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -2vw;
  // right: 0vw;
  height: 90vh;
  width: 25vw;
  border-radius: 24px 0 0 24px;
  background-color: white;
  z-index: 10;
  box-shadow: -6px 0px 15px -6px rgb(184, 184, 184);
  transition: ease 0.8s;

  .itemsBox {
    display: flex;
    flex-direction: column;
    background-color: purple;
  }

  .footer{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 12px;
    margin-top: auto;
    .continueButton{
      width: 80%;
      border-radius: 24px;
      background-color: purple;
      cursor: pointer;
    }
  }
}
</style>
