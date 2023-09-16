<template>
    <div class="wrapperr" v-if="Open">
        <div class="menuBox">
            <div class="item" v-for="item of getHourArray(Menu, $store.state.bookings.availability.classFormat.format)"
                @click="event => ChangeOption(event, item, Menu)">
                <h1>
                    {{ item }}
                </h1>
            </div>
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
.wrapperr {
    position: absolute;
    display: flex;
    overflow: hidden;
    top: 3.3rem;
    width: 100%;
    border-radius: 2rem;
    // box-shadow: 0px 6px 15px 0px hsl(0, 0%, 90%);
    z-index: 1;

    .menuBox {
        display: flex;
        flex-direction: column;
        height: 33rem;
        background-color: hsl(0, 0%, 99%);
        flex-grow: 1;
        overflow-y: scroll;

        h1 {
            // align-self: center;
            // position: absolute;
            // transform: translateY(0vh);
            transition: 1s;
            padding: 0.6rem 0;
            font-size: 1.6rem;
        }

        .item {
            &:hover {
                background-color: hsl(0, 0%, 94%);
            }
        }
    }
}

/* width */
::-webkit-scrollbar {
    width: 1rem;
    overflow: hidden;
}

/* Track */
::-webkit-scrollbar-track {
    // background: hsl(0, 0%, 94%);
    // border-radius: 0px 35px 35px 0px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: hsl(0, 0%, 90%);
    border-radius: 1rem 0 0 1rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: hsl(0, 0%, 84%);
}
</style>