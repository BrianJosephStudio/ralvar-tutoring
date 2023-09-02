<template>
    <div class="wrapper">

        <form>
            <div class="row">
                <label for="first-name">First Name:</label>
                <input type="text" id="first-name" name="first-name" required>
            </div>

            <div class="row">
                <label for="last-name">Last Name:</label>
                <input type="text" id="last-name" name="last-name" required>
            </div>

            <div class="row">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>

            <div class="row">
                <label for="phone">Phone Number:</label>
                <input type="tel" id="phone" name="phone">
            </div>

            <div class="row">
                <label for="birthday">Birthday:</label>
                <input type="date" id="birthday" name="birthday">
            </div>

            <!-- <label>Gender:</label>
            <div class="row">
                <input type="radio" id="male" name="gender" value="male">
                <label for="male">Male</label>
                <input type="radio" id="female" name="gender" value="female">
                <label for="female">Female</label>
                <input type="radio" id="other" name="gender" value="other">
                <label for="other">Other</label>
            </div>
            <input type="text" id="other-gender" name="other-gender" placeholder="Specify your gender"
                style="opacity: 0;transition: 0.5s;"> -->

            <div class="row">
                <label for="city">City:</label>
                <input type="text" id="city" name="city" placeholder="e.g. Madrid">
            </div>

            <button @click="event => proceedToPayment(event)">Submit</button>
        </form>
    </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import { submitBookingData } from "../modules/server.js"

const store = useStore();
const router = useRouter();
if (store.state.bookings.booking.classData.dates.length === 0) {
    router.replace("/bookings")
}
onMounted(() => {
    const radioButtons = document.querySelectorAll(`[name="gender"]`)
    const otherOption = document.getElementById("other")
    const otherInput = document.getElementById("other-gender")
    radioButtons.forEach(radioButton => {
        radioButton.addEventListener("change", () => {
            otherInput.style.opacity = otherOption.checked ? "1" : "0"
        })
    })
})
const proceedToPayment = async (event) => {
    event.preventDefault()
    const formData = {
        name: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        birthday: document.getElementById('birthday').value,
        city: document.getElementById('city').value
    };
    /**
     * todo: PERFORM FORMDATA VALIDATION
     */
    store.commit("setClientData", formData)
    /**
     * ! THIS SHOULD ONLY HAPPEN IF VALIDATION IS PASSED
     */
    submitBookingData(store.state.bookings.booking)
        .then(response => {
            console.log(response.message)
            console.log(response.clientSecret)
            store.commit("setClientSecret", response.clientSecret)
            router.push("/payment")

        })
        .catch(e => {
            console.error(e);
            console.log("Something has gone wrong, please try again.")
        })
}
</script>

<style scoped lang="scss">
.wrapper {
    display: flex;
    place-content: center;
    flex-direction: column;
    height: 95vh;
    width: 100vw;
}

form {
    display: flex;
    flex-direction: column;
    place-items: center;
    align-self: center;
    width: 35vw;
    padding: 2.5vw 0;
    justify-content: center;
    background-color: hsl(260, 40%, 75%);
    box-shadow: 0.5vw 0.5vw 1vw hsl(0, 0%, 75%);
    border-radius: 24px;

    .row {
        margin: 1vw 0;
    }

    label {
        // margin-right: 1vw;
        font-family: 'Raleway', sans-serif;
        color: hsl(0, 0%, 100%);
        font-size: 1.2vw;
        line-height: 1.1;
    }

    input[type="text"],
    input[type="email"],
    input[type="tel"],
    input[type="date"] {
        margin-left: 1vw;
    }

    input {
        font-family: 'Raleway', sans-serif;
        color: hsl(0, 0%, 10%);
        font-size: 1vw;
        line-height: 1.1;
        height: 30px;
        border-radius: 6px;
        background-color: hsl(0, 0%, 100%);
        border-color: hsl(0, 0%, 95%);
        border-style: solid;
        align-items: center;
        border-color: hsl(0, 0%, 95%);
        outline: none;
        outline-color: hsl(0, 0%, 60%);
    }
}
</style>
