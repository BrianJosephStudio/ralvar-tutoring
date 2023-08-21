<template>
    <div class="payment">
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
import { onMounted } from "vue"
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import { loadStripe } from "@stripe/stripe-js"


const store = useStore();
const router = useRouter();

onMounted(async () => {
    const stripe = await loadStripe(`pk_test_51NgmsQICkqKXp7Quz3Pg96iYp2kMrCDzTv2haJP322fpyrJOQJBWL8WrZexBzfeNnNSQgfqoMqKl8tS9TT1Yv1ip00ZMzwmQzu`)
    let elements
    const response = await fetch("http://localhost:3000/api/paymentIntent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            amount: store.state.bookings.booking.paymentData.checkoutPrice
        })
    })
    if (!response.ok) {
        console.log(await response.json())
        return
    }
    const { clientSecret } = await response.json()
    console.log("aqui")
    console.log(clientSecret)
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

}
</style>