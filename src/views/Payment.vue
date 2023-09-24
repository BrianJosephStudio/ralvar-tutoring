<template>
    <div class="payment">
        <form id="payment-form" class="form">
            <div id="payment-element">
                <!--Stripe.js injects the Payment Element-->
            </div>
            <button id="submit" @click="event => pay(event)">Pay now</button>
            <!-- <div id="payment-message" class="hidden"></div> -->
        </form>
        <Transition name="warningFade">
            <WarningOverlay v-if="timeoutWarning" :Header="String(`It's a little quiet in here...`)"
                :Body="String('Are you still there?')" :Timer="true" :Timeout="60" :TimeoutCallback="abort" />
        </Transition>
        <Transition name="warningFade">
            <WarningOverlay v-if="paymentFailedWarning" :Header="paymentCode" :Body="paymentDeclineCode" :Timer="false"
                :TimeoutCallback="() => { }" :CustomButton="true" :ButtonText="String('Try Again')"
                :ButtonCallback="tryAgain" />
        </Transition>
        <Transition name="warningFade">
            <WarningOverlay v-if="canceled_payment_warning" :Header="String('The payment was canceled due to inactivity')"
                :Body="String('Redictering to you to the main page')" :Timer="true" :Timeout="7" :TimeoutCallback="abort"
                :CustomButton="true" :ButtonText="String('Home')" :ButtonCallback="abort" />
        </Transition>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useStore } from "vuex";
import { useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { loadStripe } from "@stripe/stripe-js";
import WarningOverlay from "../components/WarningOverlay.vue"
import { abortBooking, checkDate } from "../modules/server";
import config from "../../config.js"
const API_KEY = `pk_test_51NgmsQICkqKXp7Quz3Pg96iYp2kMrCDzTv2haJP322fpyrJOQJBWL8WrZexBzfeNnNSQgfqoMqKl8tS9TT1Yv1ip00ZMzwmQzu`

const store = useStore();
const router = useRouter();
const canceled_payment_warning = ref(false)
const timeoutWarning = ref(false)
const paymentFailedWarning = ref(false)
const paymentCode = ref("")
const paymentDeclineCode = ref("")
let stripe
let elements
let idleTimeOut;
let idleWarning
let timeoutComplete = false

onMounted(async () => {
    startIdleTimeOut()
    document.addEventListener("mousemove", resetIdleTimeOut)
    document.addEventListener("click", resetIdleTimeOut)
    document.addEventListener("keydown", resetIdleTimeOut)
    //dd
    stripe = await loadStripe(API_KEY)
    const clientSecret = store.state.bookings.booking.paymentData.clientSecret
    const appearance = {
        theme: "flat",
        variables: {
            colorPrimary: "hsl(260, 40%, 75%)",
            colorBackground: "hsl(0, 0%, 96%)",
        }
    }
    elements = stripe.elements({ appearance, clientSecret })

    const paymentElementOptions = {
        layout: "tabs",
    };

    const paymentElement = elements.create("payment", paymentElementOptions);
    paymentElement.mount("#payment-element");
    return
})
onBeforeRouteLeave(async (to, from) => {
    if (!store.state.bookings.booking.paymentData.confirmed && !timeoutComplete) {
        const leave = window.confirm("If you leave now you will lose all your progress.")
        if (leave) {
            clearTimeout(idleTimeOut)
            clearInterval(idleWarning)
            document.removeEventListener("mousemove", resetIdleTimeOut)
            document.removeEventListener("click", resetIdleTimeOut)
            document.removeEventListener("keydown", resetIdleTimeOut)
            abortBooking()
            store.dispatch("resetAllState")
            await checkDate()
            return true
        } else {
            return false
        }
    }
    clearTimeout(idleTimeOut)
    clearInterval(idleWarning)

})
function abort() {
    timeoutComplete = true
    abortBooking()
    store.dispatch("resetAllState")
    router.push({ name: "Bookings" })
}
function tryAgain() {
    paymentFailedWarning.value = false

}
async function pay(event) {
    event.preventDefault()
    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: `${config.url}/payment_processing`,
            receipt_email: store.state.bookings.booking.clientData.email
        }
    })
    if (error) {
        console.error(error)
        if (error.payment_intent && error.payment_intent.status === "canceled") {
            canceled_payment_warning.value = true
        } else {
            if (error.code) {
                paymentCode.value = `${error.code.replace("_", " ")}.`
            }
            if (error.decline_code) {
                paymentDeclineCode.value = `${error.decline_code.replace("_", " ")}.`
            }
            paymentFailedWarning.value = true
        }

    }
}
function startIdleTimeOut() {
    idleTimeOut = setTimeout(() => {
        showTimeOutWarning()
    }, 1000 * 60 * 2);
}
function resetIdleTimeOut() {
    clearTimeout(idleTimeOut)
    startIdleTimeOut()
    hideTimeOutWarning()
}
function showTimeOutWarning() {
    timeoutWarning.value = true
}
function hideTimeOutWarning() {
    timeoutWarning.value = false
}


</script>

<style scoped lang="scss">
.payment {
    position: relative;
    // height: 100vh;
    // width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 2rem;
    padding: 1.2rem;
    gap: 1rem;
    background-color: hsl(0, 0%, 99%);
    box-shadow: 1rem 1rem 12px hsl(0, 0%, 94%);
    margin-top: 3rem;
    overflow: hidden;

    h1 {
        margin: 0;
        padding: 0;
        font-size: 1rem;
    }

    .form {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        // justify-content: center;
        // width: 24rem;
        // width: 100%;
        // height: 50vh;


        button {
            width: auto;
            font-family: 'Raleway';
            background-color: hsl(260, 40%, 75%);
            // margin-left: 1rem;
            margin-top: 1.6rem;
            flex-grow: 1;
        }
    }
}
</style>