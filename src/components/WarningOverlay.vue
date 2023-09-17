<template>
    <div ref="warningContainer" class="warningContainer">
        <div class="content">
            <h1>{{ Header }}</h1>
            <h1>{{ Body }}</h1>
        </div>
        <div class="timer" v-if="Timer">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="8rem" height="8rem">
                <defs>
                    <linearGradient id="GradientColor">
                        <stop offset="0%" stop-color="#e91e63" />
                        <stop offset="100%" stop-color="#673ab7" />
                    </linearGradient>
                </defs>
                <circle ref="progressBar" cx="50%" cy="50%" r="4rem" stroke-linecap="round" />
            </svg>
            <h1 ref="warningCountdown">{{ timerCount }}</h1>
        </div>
        <button v-if="CustomButton" @click="ButtonCallback">{{ ButtonText }}</button>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue"
const props = defineProps({
    Header: String,
    Body: String,
    Timer: Boolean,
    Timeout: Number,
    TimeoutCallback: Function,
    CustomButton: Boolean,
    ButtonText: String,
    ButtonCallback: Function,

})
let interval
onMounted(() => {
    if (props.Timer) {
        progressBar.value.style.animation = `timeoutBar ${timerCount.value}s linear forwards`
        interval = setInterval(() => {
            timerCount.value--
            if (timerCount.value === 0) {
                props.TimeoutCallback()
                clearInterval(interval)
            }
        }, 1000);
    }
})
onBeforeUnmount(() => {
    clearInterval(interval)
})

const timerCount = ref(props.Timeout)
const progressBar = ref(null)
</script>


<style scoped lang="scss">
.warningContainer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(260, 40%, 75%, 0.9);
    background-color: hsla(260, 0%, 94%, 0.9);
    backdrop-filter: blur(0.3rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    transition: 0.4s;
    gap: 2rem;

    .content {
        max-width: 75%;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;

        h1 {
            // line-height: 2rem;
            font-family: "Raleway";
            // color: rgb(255, 255, 255);
            font-size: 1.2rem;
            font-weight: 400;
            // margin: 0.2rem 0;
        }
    }

    .timer {
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        justify-content: center;


        svg {
            transform: rotate((-90deg));
            overflow: visible;

            circle {
                fill: none;
                stroke: hsl(350, 100%, 73%);
                stroke-width: 0.6rem;
                stroke-dasharray: 26rem;
                stroke-dashoffset: 0rem;
            }

        }

        h1 {
            position: absolute;
            // color: white;
            font-size: 3.4rem;

        }
    }

}
</style>