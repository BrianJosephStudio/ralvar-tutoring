<template>
    <div class="wrapper">
        <div class="panelHeader">
            <h1>
                Contact Details
            </h1>
        </div>
        <div class="body">
            <h2>Class Platform</h2>
            <div class="contactMethod" id="platformSelection">
                <div class="imgHolder" @click="event => selectPlatform(event)" data-platform="Skype">
                    <img src="/assets/skype-logo.png" alt="" title="Skype">
                </div>
                <div class="imgHolder" @click="event => selectPlatform(event)" data-platform="Google Meet">
                    <img src="/assets/google-meet-logo.png" alt="" title="Google Meet">
                </div>
                <div class="imgHolder" @click="event => selectPlatform(event)" data-platform="Zoom">
                    <img src="/assets/zoom-logo.png" alt="" title="Zoom">
                </div>
                <div class="imgHolder" @click="event => selectPlatform(event)" data-platform="Teams">
                    <img src="/assets/microsoft-teams.png" alt="" title="Teams">
                </div>
            </div>
            <form>
                <label for="first-name">First Name:</label>
                <input type="text" id="first-name" name="first-name" placeholder="Jane" required>

                <label for="last-name">Last Name:</label>
                <input type="text" id="last-name" name="last-name" placeholder="Doe" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="JaneDoe@example.com" required>

                <label for="clientData-platformEmail">{{ store.state.bookings.booking.classData.platform }}</label>
                <input type="email" id="clientData-platformEmail" autocomplete="off"
                    :placeholder="`Your ${store.state.bookings.booking.classData.platform} e-mail`" required>

                <label for="birthdate">Date of Birth:</label>
                <input type="date" id="birthdate" name="birthdate" required>

                <label for="city">City:</label>
                <input type="text" id="city" name="city" placeholder="e.g. Madrid">
                <div class="buttons">
                    <button class="goBack" @click="event => router.push({ name: 'Bookings' })">Back</button>
                    <button class="submit" id="submitContactForm" @click="event => proceedToPayment(event)">Submit
                        <div class="fixMissingFieldsTooltip" id="submitButtonTooltip">Fix Missing Fields</div>
                    </button>
                </div>
            </form>
        </div>
        <Transition name="warningFade">
            <WarningOverlay v-if="unavailabilityWarning" :Header="String('Sorry, these dates are not available anymore.')"
                :Body="String('Redirecting you to the main page')" :Timer="true" :Timeout="7" :CustomButton="true"
                :TimeoutCallback="redirection" :ButtonText="String('Home')" :ButtonCallback="redirection" />
        </Transition>
        <Transition name="warningFade">
            <WarningOverlay v-if="badRequest" :Header="String('Some of the fields have incorrect data.')"
                :Body="String('Please, review the form and try again.')" :Timer="false" :CustomButton="true"
                :ButtonText="String('Try Again')" :ButtonCallback="() => { badRequest = false }" />
        </Transition>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import { submitBookingData } from "../modules/server.js"
import moment from "moment"
import WarningOverlay from "../components/WarningOverlay.vue"
const store = useStore();
const router = useRouter();
if (store.state.bookings.booking.classData.dates.length === 0) {
    router.replace("/bookings")
}
const unavailabilityWarning = ref(false)
const badRequest = ref(false)
onMounted(() => {
    const platform = document.querySelector(`[data-platform="${store.state.bookings.booking.classData.platform}"]`)
    if (platform) {
        platform.classList.add("selectedImg")
    }
})
function selectPlatform(event) {
    const platforms = [...event.currentTarget.parentElement.children]
    platforms.forEach(platform => {
        platform.classList.remove("selectedImg")
    })
    const platform = event.currentTarget
    platform.classList.add("selectedImg")

    store.commit("setPlatform", platform.dataset.platform)
}
const proceedToPayment = async (event) => {
    try {
        event.preventDefault()

        const formInputs = {
            platform: document.getElementById("platformSelection"),
            name: document.getElementById('first-name'),
            lastName: document.getElementById('last-name'),
            email: document.getElementById('email'),
            platformEmail: document.getElementById("clientData-platformEmail"),
            birthdate: document.getElementById('birthdate'),
            city: document.getElementById('city'),
        }
        let valid = true
        for (const key in formInputs) {
            const input = formInputs[key]
            if (key === "platform") {
                const selected = input.querySelector(".selectedImg")
                if (!selected) {
                    input.style.borderColor = "hsl(350, 100%, 73%)"
                    valid = false
                }
            } else {
                if (!input.value) {
                    input.style.borderColor = "hsl(350, 100%, 73%)"
                    valid = false
                }

            }
        }
        if (!valid) {
            const submitButton = document.getElementById("submitButtonTooltip")
            console.log(submitButton)
            submitButton.style.animation = "fixMissingFields 3s ease"
            setTimeout(() => {
                submitButton.style.animation = "none"

            }, 3000);
            return
        }

        const formData = {
            plarform: formInputs.platform.value,
            name: formInputs.name.value,
            lastName: formInputs.lastName.value,
            email: formInputs.email.value,
            platformEmail: formInputs.platformEmail.value,
            birthdate: moment(formInputs.birthdate.value, "YYYY-MM-DD").toISOString(),
            city: formInputs.city.value
        };

        store.commit("setClientData", formData)
        //
        const response = await submitBookingData(store.state.bookings.booking)
        if (!response.ok) {
            console.log(response.status)
            if (response.status === 500) {
                const message = await response.text()
                console.log("Server response: ", message)
                unavailabilityWarning.value = true
            } else if (response.status === 400) {
                badRequest.value = true
                const message = await response.text()
                console.log("Server response: ", message)
            }
            return
        }
        const body = await response.json()
        store.commit("setClientSecret", body.clientSecret)
        router.push("/payment")

    } catch (e) {
        /**
         * todo: HANDLE THIS ERROR BETTER, RIGHT NOW THE CLIENT ONLY SEES THAT THE PAGE STOPS RESPONDING
         */
        console.error(e);
        console.log("Something has gone wrong, please try again.")
    }
}
async function redirection() {
    store.dispatch("resetAllState")
    router.push({ name: "Bookings" })
    throw new Error(await response.text())
}
</script>

<style scoped lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    overflow: hidden;
    border-radius: 2rem;
    box-shadow: 0.5rem 0.5rem 6px hsl(0, 0%, 94%);
    position: relative;

    .panelHeader {
        background-color: hsl(260, 40%, 75%);
        align-self: stretch;

        h1 {
            margin: 0.6rem;
            font-size: 1.6rem;
            color: white;
            font-weight: 400;
        }
    }

    .body {
        background-color: hsl(0, 0%, 99%);
        border: solid hsl(0, 0%, 90%);
        border-width: 0 1px 1px 1px;
        display: flex;
        flex-direction: column;
        align-items: center;

        h2 {
            font-weight: 400;
            font-size: 1.2rem;
            margin-top: 1rem;
        }

        .contactMethod {
            display: flex;
            justify-content: center;
            // gap: 1rem;
            // padding: 0 2rem;
            align-items: center;
            // background-color: red;
            // height: 4rem;
            padding: 0.2rem;
            border: solid 1px;
            border-color: transparent;


            .imgHolder {
                display: flex;
                place-content: center;
                align-items: center;
                height: 6rem;
                width: 6rem;
                transition: 0.2s;
                // border-radius: 0.6rem;
                cursor: pointer;

                img {
                    // max-width: 4rem;
                    max-width: 3rem;
                    // width: auto;
                    // flex-shrink: 0;
                    // transition: 0.4s;
                }

                &:hover {
                    background-color: hsl(260, 40%, 95%);

                }


            }

            .selectedImg {
                // border: solid 1px;
                // border-radius: 1rem;
                // border-color: hsl(260, 40%, 75%);
                background-color: hsl(260, 40%, 90%);

                &:hover {
                    background-color: hsl(260, 40%, 90%);

                }
            }


        }

        form {
            display: grid;
            grid-template-columns: repeat(2, auto);
            grid-gap: 2rem 1rem;
            padding: 2rem 2rem;
            align-items: center;


            label {
                // margin-right: 1vw;
                // font-family: 'Raleway', sans-serif;
                color: black;
                font-size: 1.1rem;
                font-weight: 500;
                font-style: italic;
                line-height: 1.1;
                justify-self: flex-end;
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
                border: solid 1px;
                border-color: transparent;
                // outline-color: hsl(0, 0%, 60%);
            }

            input::placeholder {
                color: hsl(0, 0%, 75%);
            }

            input[type="checkbox"] {
                padding: 0;
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
                    position: relative;
                    flex-grow: 3;
                    background-color: hsl(260, 40%, 75%);

                    &:hover {
                        box-shadow: 0 0.2rem 0.3rem hsl(260, 0%, 75%);

                    }
                }

                // .fixMissingFieldsTooltip {
                //     position: absolute;
                //     display: flex;
                //     place-content: center;
                //     align-items: center;
                //     font-size: 0.8rem;
                //     width: 8rem;
                //     height: 1.6rem;
                //     border-radius: 1rem;
                //     margin-bottom: 0.1rem;
                //     background-color: hsl(350, 100%, 73%);
                //     bottom: 100%;
                //     left: 50%;
                //     transform: translateX(-50%);
                //     opacity: 0;
                // }

                // .fixMissingFieldsTooltipAnim{
                //     animation: fixMissingFieldsTooltip 3s ease;
                // }

                // @keyframes fixMissingFields {
                //     0% {
                //         // transform: translateX(-50%) translateY(0);
                //         opacity: 0;
                //     }

                //     40% {
                //         // transform: translateX(-50%) translateY(-32px);
                //         opacity: 1;
                //     }

                //     85% {
                //         // transform: translateX(-50%) translateY(-32px);
                //         opacity: 1;
                //     }

                //     100% {
                //         // transform: translateX(-50%) translateY(-32px);
                //         opacity: 0;
                //     }
                // }

            }
        }

        .errorView {
            display: flex;
            visibility: hidden;
            opacity: 0;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            max-height: 100%;
            max-width: 100%;
            flex-grow: 1;
            align-items: center;
            backdrop-filter: blur(14px);
            background-color: hsla(0, 0%, 100%, 0.4);
            gap: 2rem;
            transition: 0.2s;
            // padding: 3rem;

            h2 {
                font-size: 1.6rem;
                font-weight: 400;
                // color: white;
                margin: 0 3rem;
                line-height: 2.3rem;
            }

            h3 {
                // color: white;
                font-size: 1.2rem;
            }
        }

        .showError {

            visibility: visible;
            opacity: 1;
        }

        .timeoutBarAnim {
            animation: timeoutBar 7s linear;
        }
    }

}
</style>
