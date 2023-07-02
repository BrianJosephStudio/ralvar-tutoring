<template>
    <div class="tab">
        <FilterCard :cardTitle="ClassFormat.options[selected].title" @click="toggleOpen" />
        <FilterMenu :ClassFormat="ClassFormat" :ChangeOption="changeOption" :Open="isOpen" />
    </div>
</template>

<script setup>
/* Imports */
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import FilterCard from './FilterCard.vue'
import FilterMenu from './FilterMenu.vue'

const props = defineProps({
    ClassFormat:Object
})
/* Data */
const store = useStore()
const router = useRouter();
/* Methods */
const selected = ref(props.ClassFormat.selected)
const isOpen = ref(false)
const handleClick = (minuteCount) => {
    router.push('./dates')
    store.commit('setFormat', { minuteCount: minuteCount })
    store.commit('resetDates')
}
function toggleOpen(event) {
    event.stopPropagation()
    isOpen.value = !isOpen.value
    if(isOpen.value){
        document.addEventListener('click' , clickOut)
    }else{
        document.removeEventListener('click', clickOut)
    }
}
const changeOption = (option) => {
    selected.value = option.index
    isOpen.value = false
}
function clickOut(event) {
    if (event.target.className === 'option' || event.target.parentElement.className === 'option'){
        document.removeEventListener('click',clickOut)
    }else if (event.target.className !== 'frame' || event.target.parentElement.className !== 'frame'){
        toggleOpen(event)
    }
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