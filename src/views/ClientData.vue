<template>
    <div class="wrapper">
        <div class="panelHeader">
            <h1>
                Contact Details
            </h1>
        </div>
        <form>
            <label for="first-name">First Name:</label>
            <input type="text" id="first-name" name="first-name" required>

            <label for="last-name">Last Name:</label>
            <input type="text" id="last-name" name="last-name" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="birthdate">Date of Birth:</label>
            <input type="date" id="birthdate" name="birthdate">

            <label for="city">City:</label>
            <input type="text" id="city" name="city" placeholder="e.g. Madrid">
            <div class="buttons">
                <button class="goBack" @click="event => router.push({ name: 'Bookings' })">Back</button>
                <button class="submit" @click="event => proceedToPayment(event)">Submit</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import { submitBookingData } from "../modules/server.js"
import moment from "moment"
const store = useStore();
const router = useRouter();
if (store.state.bookings.booking.classData.dates.length === 0) {
    router.replace("/bookings")
}

const proceedToPayment = async (event) => {
    event.preventDefault()
    const birthdate = moment(document.getElementById('birthdate').value, "YYYY-MM-DD").toISOString()
    const formData = {
        name: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        birthdate: birthdate,
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
            console.log(store.state.bookings.booking.paymentData.clientSecret)
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
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;

    .panelHeader {
        background-color: hsl(260, 40%, 75%);
        align-self: stretch;
        border-radius: 2rem 2rem 0 0;

        h1 {
            margin: 0.6rem;
            font-size: 1.6rem;
            color: white;
            font-weight: 200;
        }
    }

    form {
        display: grid;
        grid-template-columns: repeat(2, auto);
        grid-gap: 2rem 1rem;
        padding: 1rem 2rem;
        align-items: center;
        background-color: hsl(0, 0%, 99%);
        border: solid hsl(0, 0%, 90%);
        border-width: 0 1px 1px 1px;
        box-shadow: 0.5rem 0.5rem 6px hsl(0, 0%, 94%);
        border-radius: 0 0 2rem 2rem;


        label {
            // margin-right: 1vw;
            // font-family: 'Raleway', sans-serif;
            color: black;
            font-size: 1.2rem;
            font-weight: 500;
            font-style: italic;
            line-height: 1.1;
            justify-self: flex-end;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
            color: red;
            // background: hsl(260, 40%, 75%);
            // border-radius: 50%;
        }

        input {
            font-family: 'Raleway', sans-serif;
            color: hsl(0, 0%, 10%);
            font-size: 1.2rem;
            line-height: 1.1;
            height: 2.5rem;
            padding: 0 1.5rem;
            border-radius: 0.2rem;
            background-color: hsl(0, 0%, 94%);
            border-style: none;
            outline: none;
            width: 16rem;
            // outline-color: hsl(0, 0%, 60%);
        }

        input:autofill {
            background-color: #d95151 !important;
        }

        .buttons {
            display: flex;
            gap: 0.6rem;
            grid-column-start: 1;
            grid-column-end: 3;

            button {
                font-family: 'Raleway', sans-serif;
                padding: 0.6rem 0;
                border-radius: 2rem;
                cursor: pointer;
                font-size: 1.2rem;
            }

            .goBack {
                flex-grow: 1;
                background-color: transparent;
                color: hsl(0, 0%, 8%);

                &:hover {
                    color: white;
                    background-color: hsl(260, 40%, 75%);

                }
            }

            .submit {
                flex-grow: 3;
                background-color: hsl(260, 40%, 75%);

                &:hover {
                    box-shadow: 0 0.2rem 0.3rem hsl(260, 0%, 75%);

                }
            }

        }
    }
}
</style>
