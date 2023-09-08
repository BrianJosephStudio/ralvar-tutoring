<template>
    <div>
        <h1>We're Processing your payment</h1>
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
            router.push({
                name: "bookingComplete",
                query: {
                    ClientName: response.ClientName,
                    BookedDates: JSON.stringify(response.BookedDates),
                    ConfirmationCode: response.ConfirmationCode,
                    ClientEmail: response.ClientEmail
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
        router.push({ name: "paymentError" })
    }

}

onMounted(() => {
    console.log("mounted")
    checkPayment()
})

</script>