<template>
    <div class="menuBox" v-if="Open">
        <div class="item" v-for="item of getHourArray(Menu,$store.state.bookings.availability.classFormat.format)" @click="event => ChangeOption(event, item, Menu)">
            <h1>
                {{ item }}
            </h1>
        </div>
    </div>
</template>

<script setup>
import { getHourArray } from '../modules/static.js'

const props = defineProps({
    Menu: String,
    Open: Boolean,
    ChangeOption: Function
})
</script>

<style scoped lang="scss">
.menuBox {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 3.5vw;
    left: 0px;
    height: 30vw;
    width: calc(10vw - 1px);
    background-color: hsl(0, 0%, 92%);
    z-index: 1;
    border-radius: 35px;
    box-shadow: 0px 6px 15px 0px hsl(0, 0%, 80%);
    overflow-y: scroll;

    h1 {
        // align-self: center;
        // position: absolute;
        // transform: translateY(0vh);
        transition: 1s;
        font-size: 1.5vw;
    }

    .item {
        &:hover {
            background-color: hsl(0, 0%, 80%);
        }
    }
}

/* width */
::-webkit-scrollbar {
    width: 2vw;
}

/* Track */
::-webkit-scrollbar-track {
    background: hsl(0, 0%, 94%);
    border-radius: 0px 35px 35px 0px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: hsl(0, 0%, 87%);
    border-radius: 0px 35px 35px 0px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: hsl(0, 0%, 84%);
}
</style>