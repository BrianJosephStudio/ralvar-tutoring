<template>
    <div class="payment">
        <div ref="timeoutWarning" class="timeoutWarning">
            <div class="warningFrame">
                <h1 ref="warningCountdown">60</h1>
                <h1>Seems a little quiet in here... are you still there?</h1>
            </div>
        </div>
        <form id="payment-form" class="form">
            <div id="link-authentication-element">
                <!--Stripe.js injects the Link Authentication Element-->
            </div>
            <div id="payment-element">
                <!--Stripe.js injects the Payment Element-->
            </div>
            <button id="submit">
                <div class="spinner hidden" id="spinner"></div>
                <span id="button-text">Pay now</span>
            </button>
            <div id="payment-message" class="hidden"></div>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useStore } from "vuex";
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentIntent } from "../modules/server";
import { abortBooking } from "../modules/server";
const API_KEY = `pk_test_51NgmsQICkqKXp7Quz3Pg96iYp2kMrCDzTv2haJP322fpyrJOQJBWL8WrZexBzfeNnNSQgfqoMqKl8tS9TT1Yv1ip00ZMzwmQzu`


const store = useStore();
const router = useRouter();
const timeoutWarning = ref(null)
const warningCountdown = ref(null)
let idleTimeOut;
let idleWarning
let idleCountdown

onMounted(async () => {
    startIdleTimeOut()
    document.addEventListener("mousemove", resetIdleTimeOut)
    document.addEventListener("keydown", resetIdleTimeOut)
    return
    const stripe = await loadStripe(API_KEY)
    const clientSecret = await createPaymentIntent()
    let elements
    const appearance = {
        theme: "stripe",
    }
    elements = stripe.elements({ appearance, clientSecret })
    let emailAddress = ""
    const linkAuthenticationElement = elements.create("linkAuthentication");
    // linkAuthenticationElement.mount("#link-authentication-element");

    // linkAuthenticationElement.on('change', (event) => {
    //     emailAddress = event.value.email;
    // });

    const paymentElementOptions = {
        layout: "accordion",
    };

    const paymentElement = elements.create("payment", paymentElementOptions);
    paymentElement.mount("#payment-element");
    return


})
onBeforeRouteLeave((to, from) => {
    if (!store.state.bookings.booking.paymentData.confirmed) {
        const leave = window.confirm("If you leave now you will lose all your progress.")
        if (leave) {
            clearTimeout(idleTimeOut)
            clearInterval(idleWarning)
            document.removeEventListener("mousemove", resetIdleTimeOut)
            document.removeEventListener("keydown", resetIdleTimeOut)
            abortBooking()
            store.dispatch("resetAllState")
            return true
        } else {
            return false
        }
    }
    clearTimeout(idleTimeOut)
    clearInterval(idleWarning)

})
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
    // place-items: center;
    justify-content: center;

    h1 {
        margin: 0;
        padding: 0;
        font-size: 3vw;
    }

    .form {
        display: flex;
        // flex-direction: "column";
        justify-content: center;
        // width: 100%;
        // height: 50vh;


        .input {
            width: 500px;
            height: 30px;
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