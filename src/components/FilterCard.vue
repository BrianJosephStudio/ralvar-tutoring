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

<style scoped lang="scss">
h1 {
    /* position: absolute; */
    transition: 1s;
    margin: 0.3rem 0;
    font-size: 1.8rem;
}

.frame {
    /* position: relative; */
    display: flex;
    /* flex-direction: column; */
    place-content: center;
    /* align-items: center; */
    /* justify-self: stretch; */
    border-radius: 2rem;
    /* background-color: hsl(0, 0%, 92%); */
    background-color: hsl(260, 40%, 75%);
    cursor: pointer;
    flex-grow: 1;
    transition: all 0.5s ease;

    h1 {
        color: white;
    }
}

.frame:hover {
    box-shadow: 0px 6px 15px 0px hsl(0, 0%, 80%);
}

.frame:active {
    transition: 0.2s;
}
</style>