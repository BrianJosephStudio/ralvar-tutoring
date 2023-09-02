<template>
  <div class="sidePanel" :style="togglePos()">
    <div>
      <h1>
        {{ store.state.bookings.calendar.selectedDates.length }}
        {{
          store.state.bookings.calendar.selectedDates.length > 1
          ? "classes"
          : "class"
        }}
      </h1>
    </div>
    <div class="itemsBox">
      <CartItem v-for="selectedDate of store.state.bookings.calendar.selectedDates" :Title="getItemName(selectedDate)"
        :selectedDate="selectedDate.date"></CartItem>
    </div>
    <div class="footer">
      <h1>{{ store.state.bookings.booking.paymentData.checkoutPrice }}€</h1>
      <div class="panelButton" @click="consolidateClassSelection">
        <h1>Continue</h1>
      </div>
      <div class="panelButton" @click="() => store.dispatch('resetAllState')">
        <h1>Start Over</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { inject, ref, onMounted } from "vue";
import CartItem from "./CartItem.vue";
import moment from "moment";
import { useRouter } from "vue-router";

const props = defineProps({});
const store = useStore();
const emitter = inject("emitter");
const router = useRouter();

onMounted(() => {
  store.commit("recalculateCheckoutPrice");
});
// router.beforeEach(() => {
//   store.commit("recalculateCheckoutPrice");
// });
function consolidateClassSelection() {
  store.dispatch("setClassData");
  router.replace("/client-data");
}
function togglePos() {
  const selDates = store.state.bookings.calendar.selectedDates;
  return selDates.length
    ? { right: "0vw", opacity: 1 }
    : { right: "-25vw", opacity: 0 };
}
function getItemName(selectedDate) {
  const date = moment(selectedDate.date, "YYYY/MM/DD hh:mm a");
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
    background-color: hsl(260, 40%, 75%);
  }

  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 12px;
    margin-top: auto;

    .panelButton {
      width: 80%;
      border-radius: 24px;
      background-color: hsl(260, 40%, 75%);
      cursor: pointer;
    }
  }
}
</style>
