<template>
    <div class="menu" v-if="Open">
        <li class="option" v-for="option of ClassFormat.options" @click="ChangeOption(option)">
            <h1>{{ option.title }}</h1>
        </li>
    </div>
</template>
<script setup>
defineProps({
    ClassFormat: Object,
    Open: Boolean,
    ChangeOption: Function
})
</script>
<style scoped lang="scss">
.menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 4vw;
    width: 20vw;
    background-color: hsl(0, 0%, 92%);
    border-radius: 2vw;
    opacity: 1;
    box-shadow: 0px 6px 15px 0px hsl(0, 0%, 80%);
    overflow: hidden;
    z-index: 1;
}

.option {
    list-style-type: none;
    cursor: pointer;

    &:hover {
        background-color: hsl(0, 0%, 80%);
    }

    h1 {
        margin: 6px 24px;
        font-size: 1.5vw;
    }
}
</style>