<template>
  <header>
    <div class="navBar">
      <div class="navButton" @click="this.$router.push('/bookings')"><h3>Bookings</h3></div>
      <div class="navButton" @click="this.$router.push('/classes')"><h3>Classes</h3></div>
      <div class="navButton"><h3>About</h3></div>
    </div>
  </header>
</template>

<style scoped>
header {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  vertical-align: top;
  color: black;
  background: white;
  box-shadow: 0px 0px 15px 0px rgb(184, 184, 184);
  width: 100vw;
  height: 5vh;
  min-height: 45px;
}
.navBar{
  display: flex;
  flex-direction: row;
  place-content: top;
  margin: auto;
  height: 5vh;
  min-height: 45px;
}
.navButton{
  position: relative;
  display: flex;
  flex-direction: column;
  place-content: center;
  transition: 0.2s;
  cursor: pointer;
  height: 5vh;
  min-height: 45px;
}
.navButton:hover{
  background: hsl(0, 0%, 95%);
}
.navButton:active{
  background: hsl(0, 0%, 90%);
}
</style>
