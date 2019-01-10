<template>
  <section>
    <div class="instructions">Choose your difficulty:</div>
    <div class="options">
      <div class="box">
        <button @click="goCanvas(wordeasy,'easy')">Easy</button>
        <div class="word">{{wordeasy}}</div>
      </div>
      <div class="box">
        <button @click="goCanvas(wordmedium,'medium')">Medium</button>
        <div  class="word">{{wordmedium}}</div>
      </div>
      <div class="box">
        <button @click="goCanvas(wordhard,'hard')">Hard</button>
        <div  class="word">{{wordhard}}</div>
      </div>
    </div>
  </section>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "game",
  data() {
    return {
      socket: io("localhost:3001"),
      words: null,
      counter: 0,
      wordeasy: null,
      wordmedium: null,
      wordhard: null
    };
  },
  created() {
    this.words = this.$store.getters.getWords[0]
    this.wordeasy = this.words.easy[this.getRandomInt(10)]
    this.wordmedium = this.words.medium[this.getRandomInt(10)]
    this.wordhard = this.words.hard[this.getRandomInt(10)]
  },
  methods: {
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    goCanvas(word,difficuly) {
      this.$store.dispatch('setWord', word);
      this.$store.dispatch('setDiff', difficuly)
      this.$router.push("/canvas");
    }
  }
};
</script>

<style lang="scss" scoped>
.instructions {
  margin-top: 30px;
  font-size: 25px;
}

.options {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 260px;
  background-color: green;
  margin-top: 30px;
}
.box {
  text-align: center;
}
button {
  width: 180px;
  height: 80px;
  font-size: 30px;
  border: 1px solid black;
  margin-bottom: 10px;
  margin-right: 10px;
  cursor: pointer;
  background-color: #f8b500;
  color: white;
  border-radius: 60px;
  transition: all .3s
}
button:hover {
  background-color: #ffd35b;
} 

.word{
    margin-bottom: 20px;
    font-size: 24px;
}
</style>
