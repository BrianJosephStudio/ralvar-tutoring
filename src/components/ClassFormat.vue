<template>
    <div class="tab" id="classFormatMenu" data-menu-id="filterMenu">
        <FilterCard :cardTitle="store.state.bookings.availability.classFormat.title" @click="toggleOpen" />
        <FilterMenu :ChangeOption="changeOption" :Open="isOpen" />
    </div>
</template>

<script setup>
/* Imports */
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { inject, ref } from 'vue'
import FilterCard from './FilterCard.vue'
import FilterMenu from './FilterMenu.vue'
import { checkDate } from '../modules/server.js'

const props = defineProps({
})
/* Data */
const store = useStore()
const router = useRouter();
// const selected = ref(props.ClassFormat.selected)
const isOpen = ref(false)

const emitter = inject('emitter')
/* Methods */

emitter.on('closeMenus', exception => {
    const filterMenu = document.getElementById("classFormatMenu")
    if (exception !== filterMenu.dataset.menuId) {
        isOpen.value = false
    }
})

function toggleOpen(event) {
    const filterMenu = document.getElementById("classFormatMenu")
    event.stopPropagation()
    emitter.emit('closeMenus', filterMenu.dataset.menuId)
    isOpen.value = !isOpen.value
    if (isOpen.value) {
        document.addEventListener('click', clickOut)
    } else {
        document.removeEventListener('click', clickOut)
    }
}
const changeOption = async (event, classFormat) => {
    event.stopPropagation()
    document.removeEventListener('click', clickOut)
    store.dispatch('changeClassFormat', classFormat)
    isOpen.value = false
    await checkDate()
    emitter.emit('updateAvailability')
}
function clickOut() {
    document.removeEventListener('click', clickOut)
    emitter.emit('closeMenus')
}
</script>

<style scoped>
.tab {
    position: relative;
    display: flex;
    /* flex-direction: column; */
    /* justify-items: center; */
    /* width: auto; */
}
</style>