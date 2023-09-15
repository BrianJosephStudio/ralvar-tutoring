<template>
    <div class="wrapper">
        <div class="header">
            <h1>Contact us</h1>
        </div>
        <form class="contactForm">
            <label for="contact-name">Name</label>
            <input type="text" id="contact-name" placeholder="John Doe" required>
            <label for="contact-email">Email</label>
            <input type="email" id="contact-email" placeholder="johndoe@example.com" required>
            <label for="contact-confirmationCode">Confirmation Code</label>
            <input type="text" id="contact-confirmationCode" placeholder="only if you have one">
            <label for="contact-subject">Subject</label>
            <input type="text" id="contact-subject" placeholder="Describe your issue in a few words">
            <label for="contact-message">How can we help you?</label>
            <textarea name="message" id="contact-message" cols="30" rows="10" requried></textarea>
            <button @click="event => contactRequest(event)">
                Send
                <div ref="submitButton" class="fixMissingFieldsTooltip" id="submitButtonTooltip">Fix Missing Fields</div>
            </button>
        </form>
    </div>
</template>
<script setup>
import { handleContactRequest } from "../modules/server.js"
import { useRouter } from "vue-router"
import { ref } from "vue"
const submitButton = ref(null)
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
    document.getElementById("contact-subject").value = null;
    document.getElementById("contact-message").value = null;
}
async function contactRequest(event) {
    event.preventDefault()

    const inputs = {
        name: document.getElementById("contact-name"),
        email: document.getElementById("contact-email"),
        confirmationCode: document.getElementById("contact-confirmationCode"),
        subject: document.getElementById("contact-subject"),
        message: document.getElementById("contact-message"),
    }
    console.log(inputs)
    let valid = true
    for (const key in inputs) {
        if (key === "confirmationCode") { continue }
        const input = inputs[key]
        if (!input.value) {
            input.classList.add("incorrectField")
            submitButton.value.classList.add("fixMissingFieldsTooltipAnim")
            valid = false
            setTimeout(() => {
                if (submitButton.value) {
                    submitButton.value.classList.remove("fixMissingFieldsTooltipAnim")
                }
            }, 3000);
        }
    }
    if (!valid) {
        return
    }
    // Create an object to store the form values
    const formData = {
        name: inputs.name.value,
        email: inputs.email.value,
        confirmationCode: inputs.confirmationCode.value,
        subject: inputs.subject.value,
        message: inputs.message.value
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

        .incorrectField {
            border-color: hsl(350, 100%, 73%);
        }

        button {
            position: relative;
            margin-top: 2.3rem;
        }
    }
}
</style>