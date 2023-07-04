<template>
    <div class="menuBox" v-if="Open">
        <!-- <h2>hola</h2> -->
    </div>
</template>

<script setup>
const props = defineProps({
    Open: Boolean
})

</script>

<style scoped lang="scss">
.menuBox {
    display: flex;
    position: absolute;
    top: 3.5vw;
    left: 0px;
    height: 30vw;
    width: calc(10vw - 1px);
    background-color: hsl(0, 0%, 92%);
    z-index: 1;
    border-radius: 35px;
    box-shadow: 0px 6px 15px 0px hsl(0, 0%, 80%);
}
</style>