<template>
    <div class="container">
        <div class="frame" v-on:click="updateTab('Calendar')">
            <h1>Single Class</h1>
        </div>
        <div class="frame" v-if="!clicked">
            <h1>Class Bundles</h1>
        </div>
        <div class="frame" v-if="!clicked">
            <h1>Send Me a Message</h1>
        </div>
    </div>
</template>
<style scoped>
    .frame{
        display: flex;
        place-content: center;
        align-items: center;
        margin: 15px;
        background: rgb(219, 219, 219);
        width: 25vw;
        height: 25vw;
        opacity: 50%;
        cursor: pointer;
        transition: all 0.5s ease;
        border-radius: 35px;
    }
    .frame:hover {
        opacity: 100%;
        box-shadow: 0px 10px 15px 0px hsl(0, 0%, 80%);
    }
    .frame:active{
        transition: 0.2s;
        background: hsl(0, 0%, 75%);
    }
    .container{
        display: flex;
        flex-direction: row;
        place-content: center;
    }
    </style>
<script>
    export default {
        data(){
            return {
                clicked: false,
            }
        },
        methods: {
            toggleView() {
                this.clicked = !this.clicked;
            },
            updateTab(tab){
                this.$emit("updateTab",tab)
            }
        }
    }
</script>