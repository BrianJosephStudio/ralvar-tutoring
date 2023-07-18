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
console.clear()

import { ref, inject } from 'vue'
import HourMenu from './HourMenu.vue'
import { useStore } from 'vuex'
import server from '../modules/server.js'

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
    await server.checkDate()
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
    // flex-direction: row;
    margin: 0.5vw;
    width: 20vw;
    height: 3vw;
    overflow: visible;
    cursor: pointer;

    .wrapper {
        position: relative;
        display: flex;
        place-content: center;
        flex-direction: column;
        overflow: visible;

        h1 {
            align-self: center;
            // position: absolute;
            transform: translateY(0vh);
            transition: 1s;
            font-size: 1.5vw;
        }

        .startTime {
            display: flex;
            place-content: center;
            background-color: hsl(0, 0%, 92%);
            border-radius: 35px 0px 0px 35px;
            height: 3vw;
            width: calc(10vw - 1px);
            transition: all 0.5s ease;

            &:hover {
                box-shadow: 0px 6px 15px 0px hsl(0, 0%, 80%);
            }
        }

        .endTime {
            display: flex;
            place-content: center;
            margin-left: 2px;
            background-color: hsl(0, 0%, 92%);
            border-radius: 0px 35px 35px 0px;
            height: 3vw;
            width: calc(10vw - 1px);
            transition: all 0.5s ease;

            &:hover {
                box-shadow: 0px 6px 15px 0px hsl(0, 0%, 80%);
            }
        }
    }
}
</style>