<template>
  <div id="app">
    <div id="nav">
      <div class="items">
        <div class="logo">DrawSomeGuess</div>
        <div class="img-div">
          <img src="./assets/logo.png">
        </div>
      </div>
    </div>
    <router-view/>
    <footer class="footer">
      <div class="time foot-itm">
        Score:
        <span class="foot-itm mark">{{getScore}}</span>
      </div>
      <div class="score foot-itm">
        BestTime:
        <span class="foot-itm mark">{{getBestTime}}</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  created(){
    this.setTime()
    this.setScore()
  },
  computed:{
    getScore(){
      return this.$store.getters.getScore;
    },
    getBestTime(){
      return this.$store.getters.getBestTime;
    },
  },
  methods: {
    setTime() {
      const time = localStorage.getItem('time');
        if (!time) this.time = '';
      this.$store.dispatch('setBestTime', time);
    },
    setScore(){
      this.$store.dispatch('setScore', 0);
    }
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: "Shrikhand";
  src: url("./assets/fonts/Shrikhand/Shrikhand-Regular.ttf");
}

* {
  background-color: #ece8d9;
}
#app {
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 20px;
  background-color: #00adb5;
  border: 1px solid black;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

html {
  margin: 0;
}

.logo {
  text-align: left;
  color: white;
  background-color: #00adb5;
  font-size: 24px;
  -webkit-text-stroke: 1px black;
}
img {
  height: 30px;
  background-color: #00adb5;
}

.items {
  display: flex;
  justify-content: space-between;
  background-color: #00adb5;
}

.img-div {
  background-color: #00adb5;
}

* {
  font-family: "Shrikhand";
  color: #393e46;
  margin: 0px;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid black;
  height: 40px;
  line-height: 40px;
  background-color: #00adb5;
  display: flex;
  justify-content: space-around;
}

.foot-itm {
  color: white;
  background-color: #00adb5;
  -webkit-text-stroke: 1px black;
  font-size: 20px;
}

.mark {
  color: #f8b500;
}
</style>
