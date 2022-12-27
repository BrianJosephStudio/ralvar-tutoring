<template>
    <div class="frame">
            <h1>{{ cardTitle }}</h1>
            <p>{{ cardText }}</p>
    </div>
</template>

<script setup>
defineProps({
    cardTitle: String,
    cardText: String
})
</script>

<style scoped>
h1{
    position: absolute;
    transform: translateY(0vh);
    transition: 1s;
}
p{
    position: absolute;
    transform: translateY(100px);
    opacity: 0;
    transition: 1s;
}
.frame{
    position: relative;
    display: flex;
    flex-direction: column;
    place-content: center;
    align-items: center;
    margin: 15px;
    background: rgb(219, 219, 219);
    width: 25vw;
    height: 25vw;
    opacity: 50%;
    cursor: pointer;
    transition: all 0.5s ease;
    border-radius: 35px;
    }
.frame:hover {
    opacity: 100%;
    box-shadow: 0px 10px 15px 0px hsl(0, 0%, 80%);
    place-content: top;
}
.frame:hover h1{
    transform: translateY(-10vh);
}
.frame:hover p{
    transform: translateY(0px);
    opacity: 1;
}
.frame:active{
    transition: 0.2s;
    background: hsl(0, 0%, 75%);
}
</style>