<template>
    <div class="payment">
        <h1>Payment Page under development</h1>
    </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useStore } from "vuex";
import { useRouter } from 'vue-router'

const store = useStore();
const router = useRouter();



</script>

<style scoped lang="scss">
.payment {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    // place-items: center;
    justify-content: center;

    h1 {
        margin: 0;
        padding: 0;
        font-size: 3vw;
    }
}
</style>