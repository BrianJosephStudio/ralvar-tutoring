<template>
    <!-- <div class="container">
        <h1>Processing</h1>
    </div>-->
    <div class="container">
        <div class="square">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" rx="10" ry="10" />
            </svg>
        </div>
        <div class="square">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" rx="10" ry="10" />
            </svg>
        </div>
        <div class="square">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" rx="10" ry="10" />
            </svg>
        </div>
    </div>
</template> 
<script setup>
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { checkPaymentStatus } from "../modules/server.js"
import { useStore } from "vuex";

const store = useStore()
const router = useRouter()
let timeout = 10

async function checkPayment() {
    try {
        const response = await checkPaymentStatus()
        console.log(response.status)
        if (response.status === "successful") {
            store.dispatch("resetAllState")
            store.commit("confirmBooking")
            router.push({
                name: "bookingComplete",
                query: {
                    ClientName: response.clientName,
                    BookedDates: JSON.stringify(response.bookedDates),
                    ConfirmationCode: response.confirmationCode,
                    ClientEmail: response.clientEmail
                }
            })
        } else if (response.status === "failed") {
            store.dispatch("resetAllState")
            router.push({ name: "paymentError" })
        } else if (response.status === "processing") {
            console.log(timeout)
            if (timeout === 0) {
                router.push({ name: "paymentError" })
            } else {
                timeout--
                setTimeout(() => {
                    checkPayment()
                }, 1000);
            }
        }
    }
    catch (e) {
        console.error(e)
        store.dispatch("resetAllState")
        router.push({ name: "Error" })
    }

}

onMounted(() => {
    // return
    console.log("mounted")
    checkPayment()
})

</script>
<style scoped lang="scss">
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.square {
    width: 1rem;
    height: 1rem;
    margin: 0.5rem;
    animation: pulse 1.6s ease-in infinite alternate;

    svg {
        rect {
            fill: hsl(260, 40%, 75%);

        }
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    20% {
        transform: scale(1);

    }

    80% {
        transform: scale(0);

    }

    100% {
        transform: scale(0);
    }
}

/* Offset the animations for each square */
.square:nth-child(2) {
    animation-delay: 0.1s;
}

.square:nth-child(3) {
    animation-delay: 0.2s;
}
</style>
