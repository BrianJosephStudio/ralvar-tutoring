<template>
    <h2>404 - Tab not found</h2>
    <h1>We're sorry! The tab "<span>{{ wrongPath.slice(1) }}</span>" does not exist.</h1>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const wrongPath = ref('')

wrongPath.value = router.currentRoute.value.path
</script>
<style scoped>
h1 {
    font-size: 3vw;
}

h2 {
    font: 1vw;
    color: black;
    margin-top: 8vw;
}

span {
    color: hsl(260, 40%, 50%);
}
</style>
