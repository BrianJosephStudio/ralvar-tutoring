<template>
  <div class="sidePanel">
    <div class="panelHeader">
      <h1>
        {{ store.state.bookings.calendar.selectedDates.length }}
        {{
          store.state.bookings.calendar.selectedDates.length === 1
          ? "class"
          : "classes"
        }}
      </h1>
    </div>
    <div class="itemsContainer">
      <CartItem v-for="selectedDate of store.state.bookings.calendar.selectedDates" :Title="getItemName(selectedDate)"
        :selectedDate="selectedDate.date"></CartItem>
    </div>
    <div class="footer">
      <div class="priceBox">
        <h1 class="subtotal">sub-total: ${{ store.state.bookings.booking.paymentData.checkoutPrice }}</h1>
        <h1 class="discounts">discounts : $0</h1>
        <h1 class="total">Total : ${{ store.state.bookings.booking.paymentData.checkoutPrice }}</h1>
      </div>
      <div class="buttons">

        <div class="panelButton continue" @click="consolidateClassSelection">
          <h1>Continue</h1>
        </div>
        <div class="panelButton cancel" @click="() => store.dispatch('resetAllState')">
          <h1>Cancel</h1>
        </div>
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
async function consolidateClassSelection() {
  const ready = await store.dispatch("setClassData");
  if (ready) {
    router.replace("/client-data");
  }
}
function togglePos() {
  const selDates = store.state.bookings.calendar.selectedDates;
  return selDates.length
    ? { right: "1rem", opacity: 1 }
    : { right: "-24rem", opacity: 0 };
}
function getItemName(selectedDate) {
  const date = moment(selectedDate.date);
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
  // position: absolute;
  // top: 11rem;
  // right: 50px;
  // height: 60rem;
  width: 24rem;
  border-radius: 0 2rem 2rem 0;
  background-color: hsl(0, 0%, 100%);
  border: solid hsl(0, 0%, 90%);
  border-width: 0 1px 1px 0;
  box-sizing: border-box;
  overflow: hidden;
  // box-shadow: 0.1rem 0rem 0px hsl(0, 0%, 90%);
  transition: ease 0.8s;

  .panelHeader {
    cursor: default;
    display: flex;
    place-content: center;
    align-items: center;
    background-color: hsl(260, 40%, 75%);
    height: 4rem;

    h1 {
      margin: 0.5rem 0;
      font-size: 1.6rem;
      color: white;
      font-style: italic;
    }
  }

  .itemsContainer {
    display: flex;
    flex-direction: column;
    // height: 17rem;
    flex-grow: 1;
    // height: 12rem;
    max-height: 242.953px;
    // width: 20rem;
    padding-left: 0.6rem;
    // border: solid hsl(0, 0%, 80%);
    // border-width: 0 0 0 1px;
    overflow: auto;
    // background-color: red;
  }

  .footer {
    display: flex;
    flex-direction: column;
    // align-items: center;
    // width: 100%;
    // margin-top: auto;
    gap: 0.5rem;
    padding: 1rem;

    // background-color: white;
    .priceBox {
      display: flex;
      flex-direction: column;
      // width: 100%;
      padding: 0.6rem 0;
      text-align: right;
      cursor: default;
      align-items: flex-end;

      h1 {
        margin: 0.4rem 0;
      }

      .subtotal {
        font-size: 1.2rem;
        font-style: italic;
        // color: white;
      }

      .discounts {
        font-size: 1.2rem;
        font-style: italic;
      }

      .total {
        font-size: 2rem;
        border: solid hsl(0, 0%, 86%);
        padding-top: 0.6rem;
        border-width: 1px 0 0 0;
        font-weight: 500;
      }
    }

    .buttons {
      display: grid;
      grid-template-columns: repeat(2, 50%);
      gap: 0.3rem;

      .panelButton {
        display: flex;
        place-content: center;
        border-radius: 2rem;
        cursor: pointer;
        padding: 0.6rem 0;

        h1 {
          margin: 0;
          padding: 0;
          font-size: 1.3rem;
        }

      }

      .continue {
        background-color: hsl(260, 40%, 75%);
        transition: 0.2s ease-out;

        h1 {
          color: white;
        }

        &:hover {
          box-shadow: 0 0.2rem 0.3rem hsl(260, 0%, 75%);

        }
      }


      .cancel:hover {
        background-color: hsl(354, 100%, 69%);

        h1 {
          color: white;
        }
      }
    }
  }
}

::-webkit-scrollbar {
  width: 1rem;
}

/* Track 
::-webkit-scrollbar-track {
  background: hsl(0, 0%, 96%);
  border-radius: 0px 0px 2vw 0px;
}
*/

/* Handle */
::-webkit-scrollbar-thumb {
  background: hsl(0, 0%, 90%);
  border-radius: 0px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: hsl(0, 0%, 90%);
}

@media (max-width: 660px) {
  .sidePanel {
    width: 100vw;
    border-radius: 0;
  }

}
</style>
