<template>
  <header>
    <div class="navBar">
      <div class="navButton"><h3>Bookings</h3></div>
      <div class="navButton"><h3>Classes</h3></div>
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
}
.navBar{
  display: flex;
  flex-direction: row;
  margin: auto;
  align-items: center;
  cursor: pointer;
}
.navButton{
  transition: 0.2s;
}
.navButton:hover{
  background: hsl(0, 0%, 95%);
}
.navButton:active{
  background: hsl(0, 0%, 90%);
}
</style>
