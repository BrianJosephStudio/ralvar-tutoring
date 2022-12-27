<template>
    <h1>Book A Class</h1>
    <div class="bookingTabs">
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
    <h3>Not sure which one is right for you?</h3>
    <button @click="updateRoute">Help Me Decide</button>
</template>

<script setup>
/* Plugins */
import { useRouter } from 'vue-router'

const router = useRouter();
const updateRoute = () => {
    router.push('./classes')
}
</script>

<style scoped lang="scss">
.wrapper {
    display: flex;
    flex-wrap: wrap;
}

button {
    font-family: 'Raleway', sans-serif;
}

.helpButton {
    display: flex;
    background: hsl(0, 0%, 90%);
    cursor: pointer;
    transition: 0.4s;
    border-radius: 10px;

    &:hover {
        box-shadow: 0px 0px 10px 0px hsl(0, 0%, 80%);
        border-radius: 25px;
    }

    &:active {
        background: hsl(0, 0%, 80%);
        transition: 0.2s;
    }
}

.bookingTabs {
    display: flex;
    place-content: center;
    position: relative;
    height: 60vh;
    overflow: hidden;
}

.fade-enter-active {
    transition: 0.75s ease;
    transition-delay: 0.25s;
}

.fade-leave-active {
    transition: 0.75s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateX(200px)
}

.fade-leave-to {
    opacity: 0;
    transform: translateX(200px)
}
</style>