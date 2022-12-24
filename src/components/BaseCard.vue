<template>
    <div class="frame" @click="updateRoute">
        <h1>{{ cardTitle }}</h1>
    </div>
</template>

    <script>
    export default {
        props:{
            cardTitle:{
                type: String,
                required: true
            }
        }
    }
    </script>

<style scoped>
.frame{
        display: flex;
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
}
.frame:active{
    transition: 0.2s;
    background: hsl(0, 0%, 75%);
}
</style>