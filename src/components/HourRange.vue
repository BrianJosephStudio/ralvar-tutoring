<template>
    <div class="container">
        <div class="startTime">

        </div>
        <div class="endTime">

        </div>
    </div>
</template>
<script setup>

</script>
<style scoped lang="scss">
    .container{
        display: flex;
        // flex-direction: row;
        margin: 0.5vw;
        width: 20vw;
        height: 3vw;
        cursor: pointer;
        .startTime{
            background-color: hsl(0, 0%, 92%);
            border-radius: 35px 0px 0px 35px;
            height: inherit;
            width: calc(10vw - 1px);
            transition: all 0.5s ease;

            &:hover{
                box-shadow: 0px 6px 15px 0px hsl(0, 0%, 80%);
            }
        }
        .endTime{
            margin-left: 2px;
            background-color: hsl(0, 0%, 92%);
            border-radius: 0px 35px 35px 0px;
            height: inherit;
            width: calc(10vw - 1px);
            transition: all 0.5s ease;

            &:hover{
                box-shadow: 0px 6px 15px 0px hsl(0, 0%, 80%);
            }
        }
    }
</style>