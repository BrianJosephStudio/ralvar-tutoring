<template>
    <div class="menu" v-if="Open">
        <li class="option" v-for="classFormat of classFormats" @click="event => ChangeOption(event, classFormat)">
            <h1>{{ classFormat.title }}</h1>
        </li>
    </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { classFormats } from '../modules/static.js'

const store = useStore()

defineProps({
    // ClassFormat: Object,
    Open: Boolean,
    ChangeOption: Function
})


</script>
<style scoped lang="scss">
.menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 3.3rem;
    width: 100%;
    background-color: hsl(0, 0%, 99%);
    border-radius: 2rem;
    // box-shadow: 0px 6px 15px 0px hsl(0, 0%, 90%);
    overflow: hidden;
    z-index: 1;
}

.option {
    list-style-type: none;
    cursor: pointer;

    &:hover {
        background-color: hsl(0, 0%, 94%);
    }

    h1 {
        font-size: 1.6rem;
        padding: 0.6rem 0;
    }
}
</style>