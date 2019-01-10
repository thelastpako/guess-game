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
      <button class="music-btn" @click="playMusic()">PlayMusic</button>
    </footer>
  </div>
</template>

<script>
export default {
  created() {
    this.setTime();
    this.setScore();
  },
  computed: {
    getScore() {
      return this.$store.getters.getScore;
    },
    getBestTime() {
      return this.$store.getters.getBestTime;
    }
  },
  methods: {
    setTime() {
      const time = localStorage.getItem("time");
      if (!time) this.time = "";
      this.$store.dispatch("setBestTime", time);
    },
    setScore() {
      this.$store.dispatch("setScore", 0);
    },
    playMusic() {
      const audio = new Audio(require("../public/morning.mp3"));
      audio.play();
    }
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: "Shrikhand";
  src: url("./assets/fonts/Shrikhand/Shrikhand-Regular.ttf");
}

*:focus {
    outline: none;
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


.music-btn{
    border: 1px solid black;
    height: 21px;
    background-color: white;
    border-radius: 12px;
    margin-top: 10px;
    cursor: pointer;
    transition: all .03s
}

.music-btn:hover{
    background-color: rgb(219, 219, 219);
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
  justify-content: center;
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
