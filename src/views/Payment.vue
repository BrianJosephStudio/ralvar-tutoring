<template>
    <div class="payment">
        <div ref="timeoutWarning" class="timeoutWarning">
            <div class="warningFrame">
                <h1 ref="warningCountdown">60</h1>
                <h1>Seems a little quiet in here... are you still there?</h1>
            </div>
        </div>
        <form id="payment-form" class="form">
            <div id="payment-element">
                <!--Stripe.js injects the Payment Element-->
            </div>
            <button id="submit" @click="event => pay(event)">Pay now</button>
            <div id="payment-message" class="hidden"></div>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useStore } from "vuex";
import { useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentIntent } from "../modules/server";
import { abortBooking, checkDate } from "../modules/server";
const API_KEY = `pk_test_51NgmsQICkqKXp7Quz3Pg96iYp2kMrCDzTv2haJP322fpyrJOQJBWL8WrZexBzfeNnNSQgfqoMqKl8tS9TT1Yv1ip00ZMzwmQzu`


const store = useStore();
const router = useRouter();
let stripe
let elements
const timeoutWarning = ref(null)
const warningCountdown = ref(null)
let idleTimeOut;
let idleWarning
let idleCountdown

onMounted(async () => {
    startIdleTimeOut()
    document.addEventListener("mousemove", resetIdleTimeOut)
    document.addEventListener("keydown", resetIdleTimeOut)
    //
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
    if (!store.state.bookings.booking.paymentData.confirmed) {
        const leave = window.confirm("If you leave now you will lose all your progress.")
        if (leave) {
            clearTimeout(idleTimeOut)
            clearInterval(idleWarning)
            document.removeEventListener("mousemove", resetIdleTimeOut)
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

async function pay(event) {
    event.preventDefault()


    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: "http://192.168.1.41:3000/payment_processing",
            receipt_email: store.state.bookings.booking.clientData.email
        }
    })
    if (error) {
        console.error(error)
    }
}

function startIdleTimeOut() {
    idleTimeOut = setTimeout(() => {
        showTimeOutWarning()
    }, 1000 * 60 * 4);
}
function resetIdleTimeOut() {
    clearTimeout(idleTimeOut)
    startIdleTimeOut()
    hideTimeOutWarning()
}
function showTimeOutWarning() {
    timeoutWarning.value.style.opacity = "1"
    idleCountdown = 60
    idleWarning = setInterval(() => {
        if (idleCountdown === 0) {
            hideTimeOutWarning()
            /**
             * todo: cancel payment
             */
        } else {
            console.log(warningCountdown)
            warningCountdown.value.textContent = String(idleCountdown)
        }
        idleCountdown--
    }, 1000);
}
function hideTimeOutWarning() {
    timeoutWarning.value.style.opacity = "0"
    clearInterval(idleWarning)
}


</script>

<style scoped lang="scss">
.payment {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    padding-top: 6rem;
    justify-content: flex-start;
    align-items: center;

    h1 {
        margin: 0;
        padding: 0;
        font-size: 3vw;
    }

    .form {
        display: flex;
        // justify-content: center;
        // width: 24rem;
        border-radius: 2rem;
        padding: 2rem;
        background-color: hsl(0, 0%, 99%);
        box-shadow: 1rem 1rem 12px hsl(0, 0%, 94%);
        // width: 100%;
        // height: 50vh;


        button {
            font-family: 'Raleway';
            background-color: hsl(260, 40%, 75%);
            margin-left: 1rem;
        }
    }

    .timeoutWarning {
        opacity: 0;
        pointer-events: none;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        background-color: hsla(0, 0%, 0%, 0.2);
        backdrop-filter: blur(12px);
        display: flex;
        flex-direction: column;
        place-content: center;

        .warningFrame {
            background-color: hsl(0, 0%, 90%);
            width: 48rem;
            height: 24rem;
            display: flex;
            flex-direction: column;
            place-content: center;

            h1 {
                color: red;
                font-size: 4rem;
            }

            h2 {
                color: black;
            }
        }
    }

}
</style>