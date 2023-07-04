<template>
    <div class="frame">
        <h1>{{ cardTitle }}</h1>
    </div>
</template>

<script setup>
defineProps({
    cardTitle: String
})
</script>

<style scoped>
h1 {
    position: absolute;
    transform: translateY(0vh);
    transition: 1s;
    font-size: 1.5vw;
}

.frame {
    /* position: relative; */
    display: flex;
    flex-direction: column;
    place-content: center;
    align-items: center;
    margin: 0.5vw;
    background-color: hsl(0, 0%, 92%);
    width: 20vw;
    height: 3vw;
    /* opacity: 50%; */
    cursor: pointer;
    transition: all 0.5s ease;
    border-radius: 35px;
}

.frame:hover {
    box-shadow: 0px 6px 15px 0px hsl(0, 0%, 80%);
}

.frame:active {
    transition: 0.2s;
}
</style>