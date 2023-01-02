<template>
    <div class="comp">
        <Calendar />
    </div>
</template>
<script setup>
import Calendar from '../../components/Calendar.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'

</script>

<style scoped>
.comp {
    display: flex;
    flex-direction: row;
}
</style>