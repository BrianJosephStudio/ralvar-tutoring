<template>
    <div class="wrapper">
        <div class="main">
            <div class="title">
                <!-- <h1>Yay, {{ ClientName }}!</h1> -->
                <h1>Your booking is ready!</h1>
            </div>
            <div class="section">
                <h2>Your Booking:</h2>
                <div class="frame">
                    <h3 v-for="date of JSON.parse(BookedDates)">{{ moment(date.start).format("MMM") }} {{
                        moment(date.start).format("Do") }}
                        | {{ moment(date.start).format("HH:mm") }} - {{ moment(date.end).format("HH:mm") }}</h3>
                </div>
            </div>
            <div class="section">
                <h2>Confirmation Code</h2>
                <div class="frame code" @click="event => copyConfirmationCode(event)"
                    @mouseleave="event => resetTooltip(event)">
                    <h3>
                        {{ ConfirmationCode }}
                    </h3>
                    <div class="tooltip">Copy Confirmation Code</div>
                </div>
            </div>
            <div class="section">
                <h2>An e-mail containing these details has been sent to:</h2>
                <div class="frame">
                    <h3 class="email">{{ ClientEmail }}</h3>
                </div>
            </div>
            <div class="message">
                <h1>See you then, {{ ClientName }}!</h1>
            </div>
            <button @click="() => {
                router.push({ name: 'Bookings' })
            }">Continue</button>
        </div>
        <div class="help">
            <h3>If anything went wrong with this booking or you need to make any changes please click <a
                    href="http://localhost:3000/contact">here</a></h3>
            <!-- <button>Something has gone wrong</button> -->
        </div>

    </div>
</template>
<script setup>
import moment from "moment"
import { onMounted } from "vue";
import { useRouter } from "vue-router"

const router = useRouter()
const props = defineProps({
    ClientName: String,
    BookedDates: Array,
    ConfirmationCode: String,
    ClientEmail: String
})

function copyConfirmationCode(event) {
    const codeElem = event.currentTarget.children[0]
    navigator.clipboard.writeText(codeElem.textContent)
    const tooltip = event.currentTarget.children[1]
    tooltip.textContent = "Copied!"
}
function resetTooltip(event) {
    const tooltip = event.currentTarget.children[1]
    setTimeout(() => {
        tooltip.textContent = "Copy Confirmation Code"
    }, 300);
}

</script>
<style scoped lang="scss">
.wrapper {
    // background-color: hsl(0, 0%, 73%);
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    // background-color: blue;
    margin-top: 3rem;
    margin-bottom: 2rem;
    // align-items: center;
    // z-index: -2;

    .main {
        // padding: 2rem 0;
        position: relative;
        display: flex;
        flex-direction: column;
        // background-color: red;
        padding-bottom: 2rem;
        align-items: center;
        border-radius: 2rem;
        overflow: hidden;
        border: solid hsl(0, 0%, 94%) 1px;
        box-shadow: 0.2rem 0.2rem 1rem hsl(0, 0%, 90%);


        .title {
            align-self: stretch;
            background-color: hsl(260, 40%, 75%);
            padding: 0.8rem;

            h1 {
                color: white;
                // color: rgb(22, 197, 89);
                // color: hsl(0, 0%, 56);
                font-size: 2rem;
                font-weight: 400;
            }
        }

        .section {
            margin: 1.2rem 2rem;

            h2 {
                // text-align: left;
                font-weight: 200;
            }

            .frame {
                border-radius: 1rem;
                background-color: hsl(0, 0%, 99%);
                width: 48rem;
                padding: 1.2rem 0;
                margin-top: 1rem;

                h3 {
                    font-size: 2rem;
                    font-weight: 400;
                }

                .email {
                    font-weight: 400;
                }

            }

            .code {
                cursor: pointer;
                position: relative;

                h3 {
                    color: hsl(260, 40%, 75%);
                }

                &:hover .tooltip {
                    visibility: visible;
                    opacity: 1;
                }

                .tooltip {
                    visibility: hidden;
                    opacity: 0;
                    background-color: hsl(260, 40%, 75%);
                    position: absolute;
                    bottom: calc(100% + 1rem);
                    width: 12rem;
                    right: 0;
                    padding: 0.5rem;
                    border-radius: 1rem 1rem 1rem 0;
                    color: white;
                    transition: 0.2s ease-out;

                }

                .tooltip::after {
                    content: "";
                    margin: 0;
                    left: 0;
                    top: 100%;
                    position: absolute;
                    z-index: 1;
                    border: solid;
                    border-width: 0.3rem;
                    border-color: hsl(260, 40%, 75%) transparent transparent hsl(260, 40%, 75%);
                }

            }
        }

        .message {

            h1 {
                font-size: 1.6rem;
                color: hsl(260, 40%, 75%);
                margin: 2rem 0;
                font-weight: 400;
            }

        }

        button {
            width: 12rem;
            // align-self: flex-end;
        }
    }

    .help {
        h3 {
            font-weight: 400;

            span {
                font-weight: 500;
                color: hsl(260, 40%, 75%);
                cursor: pointer;
            }
        }

    }

}
</style>