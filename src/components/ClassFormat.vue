<template>
    <div class="tab" ref="filterMenu" data-menu-id="filterMenu">
        <FilterCard :cardTitle="ClassFormat.options[selected].title" @click="toggleOpen" />
        <FilterMenu :ClassFormat="ClassFormat" :ChangeOption="changeOption" :Open="isOpen" />
    </div>
</template>

<script setup>
/* Imports */
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { inject, ref } from 'vue'
import FilterCard from './FilterCard.vue'
import FilterMenu from './FilterMenu.vue'

const props = defineProps({
    ClassFormat: Object
})
/* Data */
const store = useStore()
const router = useRouter();
const selected = ref(props.ClassFormat.selected)
const isOpen = ref(false)
const filterMenu = ref(null)

const emitter = inject('emitter')
/* Methods */

emitter.on('closeMenus', exception => {
    if (exception !== filterMenu.value.dataset.menuId) {
        isOpen.value = false
    }
})

function toggleOpen(event) {
    event.stopPropagation()
    emitter.emit('closeMenus', filterMenu.value.dataset.menuId)
    isOpen.value = !isOpen.value
    if (isOpen.value) {
        document.addEventListener('click', clickOut)
    } else {
        document.removeEventListener('click', clickOut)
    }
}
const changeOption = (option) => {
    event.stopPropagation()
    selected.value = option.index
    isOpen.value = false
}
function clickOut(event) {
    document.removeEventListener('click', clickOut)
    emitter.emit('closeMenus')
}
</script>

<style scoped>
.tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    position: relative;
}
</style>