<template>
    <div class="wrapper">
        <div class="header">
            <h1>Contact us</h1>
        </div>
        <form class="contactForm">
            <label for="contact-name">Name</label>
            <input type="text" id="contact-name" required>
            <label for="contact-email">Email</label>
            <input type="email" id="contact-email" placeholder="yourname@example.com" required>
            <label for="contact-confirmationCode">Confirmation Code</label>
            <input type="text" id="contact-confirmationCode">
            <label for="contact-message">How can we help you?</label>
            <textarea name="message" id="contact-message" cols="30" rows="10" requried></textarea>
            <button @click="event => contactRequest(event)">Send</button>
        </form>
    </div>
</template>
<script setup>
import { handleContactRequest } from "../modules/server.js"
import { useRouter } from "vue-router"
const router = useRouter()

router.beforeEach((to, from) => {
    if (from.name === "Contact") {
        cleanContactForm()
    }
})
function cleanContactForm() {
    document.getElementById("contact-name").value = null;
    document.getElementById("contact-email").value = null;
    document.getElementById("contact-confirmationCode").value = null;
    document.getElementById("contact-message").value = null;
}
async function contactRequest(event) {
    event.preventDefault()
    console.log("Starting contact request")
    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const confirmationCode = document.getElementById("contact-confirmationCode").value;
    const message = document.getElementById("contact-message").value;

    // Create an object to store the form values
    const formData = {
        name: name,
        email: email,
        confirmationCode: confirmationCode,
        message: message
    };
    try {
        await handleContactRequest(formData)

        router.push({ name: "Bookings" })
    } catch (e) {
        console.error(e)
        router.push({ name: "Error" })
    }
}
</script>
<style scoped lang="scss">
.wrapper {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    width: 30rem;

    .header {
        background-color: hsl(260, 40%, 75%);

        border-radius: 1.6rem 1.6rem 0 0;

        h1 {
            font-size: 1.6rem;
            color: white;
            padding: 1rem;
        }
    }

    .contactForm {
        text-align: left;
        display: flex;
        flex-direction: column;
        background-color: hsl(0, 0%, 99%);
        padding: 0 1.6rem 2.4rem 1.6rem;
        border-radius: 0 0 1.6rem 1.6rem;
        color: black;

        label {
            margin-top: 1rem;
            margin-bottom: 0.4rem;
        }

        input {
            background-color: hsl(0, 0%, 96%);
            border: none;
            padding: 0.6rem 1rem;
            font-size: 1.2rem;
            font-family: "Raleway";
            border-radius: 0.6rem;
            outline: none;
            border: solid 1px;
            border-color: hsl(0, 0%, 90%);
            color: black;
        }

        textarea {
            background-color: hsl(0, 0%, 96%);
            border-radius: 0.6rem;
            color: black;
            font-size: 1rem;
            font-family: "Raleway";
            padding: 0.6rem;
            outline-style: none;
            border-color: hsl(0, 0%, 90%);
        }

        button {
            margin-top: 2rem;
        }
    }
}
</style>