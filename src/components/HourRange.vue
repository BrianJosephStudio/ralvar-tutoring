<template>
    <div class="container">
        <div class="wrapper">
            <div ref="startTime" class="startTime" @click="toggleOpen" data-menu-id="startTime">
                <h1>
                    {{ $store.state.bookings.availability.startTime }}
                </h1>
            </div>
            <HourMenu :Open="startOpen" :Menu="'start'" :ChangeOption="changeOption"></HourMenu>
        </div>
        <div class="wrapper">
            <div ref="endTime" class="endTime" @click="toggleOpen" data-menu-id="endTime">
                <h1>
                    {{ $store.state.bookings.availability.endTime }}
                </h1>
            </div>
            <HourMenu :Open="endOpen" :Menu="'end'" :ChangeOption="changeOption" style="margin-left: 2px;"></HourMenu>
        </div>
    </div>
</template>


<script setup>

import { ref, inject } from 'vue'
import HourMenu from './HourMenu.vue'
import { useStore } from 'vuex'
import { checkDate } from '../modules/server.js'

const store = useStore()

const startTime = ref(null)
const endTime = ref(null)

const startOpen = ref(false)
const endOpen = ref(false)

// const selectedStartTime = ref('12:00')
// const selectedEndTime = ref('18:00')

const emitter = inject('emitter')
emitter.on('closeMenus', exception => {
    if (exception !== startTime.value.dataset.menuId) {
        startOpen.value = false
    }
    if (exception !== endTime.value.dataset.menuId) {
        endOpen.value = false
    }
})


function toggleOpen(event) {
    event.stopPropagation()
    const target = event.currentTarget
    try { target.parentElement.children }
    catch (e) {
        emitter.emit('closeMenus')
        document.removeEventListener('click', clickOut)
        return
    }
    let menuClass = target.parentElement.children[0].className
    let open
    if (menuClass === 'startTime') {
        open = startOpen
        emitter.emit('closeMenus', startTime.value.dataset.menuId)
    } else if (menuClass === 'endTime') {
        open = endOpen
        emitter.emit('closeMenus', endTime.value.dataset.menuId)
    }
    open.value = !open.value
    if (open.value) {
        document.addEventListener('click', clickOut)
    } else {
        document.removeEventListener('click', clickOut)
    }
}
const changeOption = async (event, option, menu) => {
    event.stopPropagation()
    store.dispatch('changeTimeFilter', { value: option, filter: menu })
    document.removeEventListener('click', clickOut)
    emitter.emit('closeMenus')
    await checkDate()
    emitter.emit('updateAvailability')
}
function clickOut() {
    document.removeEventListener('click', clickOut)
    emitter.emit('closeMenus', null)
}
</script>


<style scoped lang="scss">
.container {
    display: flex;
    overflow: visible;
    gap: 0.3rem;
    cursor: pointer;

    .wrapper {
        position: relative;
        flex-grow: 1;

        h1 {
            transition: 1s;
            font-size: 1.8rem;
            margin: 0.3rem 0;
        }

        @mixin timeFrame {
            display: flex;
            place-content: center;
            background-color: hsl(260, 40%, 75%);
            transition: all 0.5s ease;

            h1 {
                color: white;
            }

            &:hover {
                box-shadow: 0px 6px 15px 0px hsl(0, 0%, 80%);
            }
        }

        .startTime {
            @include timeFrame;
            border-radius: 2rem 0 0 2rem;
        }

        .endTime {
            @include timeFrame;
            border-radius: 0 2rem 2rem 0;
        }
    }
}
</style>