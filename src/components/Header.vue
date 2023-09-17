<template>
  <header>
    <div class="navBar">
      <div class="navButton" @click="this.$router.push('/bookings')">
        <h3>Bookings</h3>
      </div>
      <!-- <div class="navButton" @click="this.$router.push('/classes')">
        <h3>Classes</h3>
      </div>
      <div class="navButton">
        <h3>About</h3>
      </div> -->
      <div class="navButton" @click="this.$router.push({ name: 'Contact' })">
        <h3>Contact</h3>
      </div>
    </div>
  </header>
</template>

<style scoped>
h3 {
  margin: 0 1rem;
}

header {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* vertical-align: top; */
  color: black;
  background: white;
  /* box-shadow: 0px 0px 3rem 0px hsl(0, 0%, 94%); */
  width: 100vw;
  height: 4rem;
}

.navBar {
  display: flex;
  flex-direction: row;
  place-content: top;
  margin: auto;
  height: 4rem;
  z-index: 1;
}

.navButton {
  position: relative;
  display: flex;
  flex-direction: column;
  place-content: center;
  transition: 0.2s;
  cursor: pointer;
  height: inherit;
  min-height: inherit;
}

.navButton:hover {
  background: hsl(0, 0%, 95%);
}

.navButton:active {
  background: hsl(0, 0%, 90%);
}
</style>
