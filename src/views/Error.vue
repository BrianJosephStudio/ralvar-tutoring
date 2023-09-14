<template>
    <div class="container">
        <h1>{{ Error }}</h1>
        <h2>Please contact us <a href="http://192.168.1.41:3000/contact">here</a> if this error persists</h2>
    </div>
</template>
<script setup>
const props = defineProps({
    Error: String
})
</script>
<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    flex-grow: 1;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 2.5rem;
        color: hsl(0, 0%, 80%);
        font-weight: 500;
    }

}
</style>