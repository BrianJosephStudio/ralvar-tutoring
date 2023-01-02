<template>
    <div class="listItem">
        <h2>{{ hour }}</h2>
    </div>
</template>

<script setup>
const props = defineProps({
    hour: String
})
</script>

<style scoped lang="scss">
.listItem {
    display: flex;
    flex-direction: column;
    place-content: center;
    height: 50px;
    border-style: ridge;
    border-width: 1px 0px;

    border-color: hsl(0, 0%, 90%);

    &:hover {
        background-color: hsl(0, 0%, 90%);
    }

    h2 {
        color: black;
    }
}
</style>