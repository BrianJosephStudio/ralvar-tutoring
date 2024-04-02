<template>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <h1>We got your message!</h1>
            </div>
            <div class="body">
                <p>Thank you for getting in touch with us!</p>
                <p>We'll get back to you as soon as possible.</p>

                <p>Your support ticket is:</p>
                <div class="ticket">
                    <h2>{{ SupportTicket }}</h2>
                </div>
                <p>This number helps us keep track of your issue.</p>
                <p>Talk to you soon!</p>
                <button @click="$router.push({ name: 'Bookings' })">Home</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
const props = defineProps({
    SupportTicket: String
})
</script>
<style scoped lang="scss">
.wrapper {
    h1 {
        font-family: "Raleway", sans-serif;
        font-weight: 400;
        color: white;
        font-size: 1.6rem;
        margin: 0;
    }

    h2 {
        font-family: "Raleway", sans-serif;
        font-weight: 200;
        font-size: 1.4rem;
        font-weight: 400;

    }

    h3 {
        font-family: "Raleway", sans-serif;
        font-weight: 400;
        font-size: 1rem;
        text-align: right;
        color: hsl(0, 0%, 60%);
    }

    p {
        font-family: "Raleway", sans-serif;
        font-weight: 200;
        font-size: 1.2rem;
        margin: 0;
        color: black;
    }

}

.container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    align-self: center;
    border-radius: 2rem;
    overflow: hidden;
    box-shadow: 0.6rem 0.6rem 1rem hsl(0, 0%, 90%);
    width: 32rem;
    /* min-width: 260px; */
    margin-top: 3rem;

    .header {
        text-align: center;
        background-color: hsl(260, 40%, 75%);
        justify-content: center;
        border-radius: 2rem 2rem 0 0;
        padding: 1rem 2rem;

    }

    .body {
        text-align: center;
        background-color: hsl(0, 0%, 99%);
        border: solid 1px hsl(0, 0%, 90%);
        border-radius: 0 0 2rem 2rem;
        padding: 1.6rem 2rem;
        padding-top: 1rem;

        .ticket {
            margin: 1rem 0;

            h2 {
                font-family: "Raleway";
                color: hsl(260, 40%, 75%);
            }
        }

        button {
            width: 12rem;
            margin-top: 2rem;
        }
    }
}

@media (max-width: 32rem) {
    .container {
        width: 96vw;

        h2 {
            font-size: 1rem;
        }

        h3 {
            font-size: 1rem;
            margin: 1.6rem 0 0 0;
        }

        .body {
            padding: 2rem 1.6rem;
        }
    }


}

@media(max-width:370px) {
    h1 {
        font-size: 1rem;
    }

}
</style>