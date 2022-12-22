<template>
    <div v-on:click="updateTab('bookingType')">
        <h1>Brah</h1>
    </div>
</template>
<style scoped>
    div{
        display: flex;
        flex-direction: column;
        place-content: center;
        margin:auto;
        border-radius: 35px;
        width: 25vw;
        height: 25vw;
        background: rgb(219, 219, 219);
        opacity: 50%;
        cursor: pointer;
        transition: all 0.5s ease;
    }
    div:hover{
        box-shadow: 0px 10px 15px 0px hsl(0, 0%, 80%);
        opacity: 100%
    }
    div:active{
        background: hsl(0, 0%, 75%);
        transition: 0.2s;
    }
</style>
<script>
export default {
    methods:{
        updateTab(tabName){
            this.$emit('updateTab',tabName)
        }
    }
}
</script>