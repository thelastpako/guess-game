<template>
  <section>
    <h1 class="headline" v-if="this.role === 'gueeser'">Waiting for other player to paint</h1>
    <h1 class="headline" v-if="this.role === 'painter'">Waiting for other player to guess</h1>
    <img class="loading" src="../assets/loading.gif">
  </section>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      socket: io("localhost:3001"),
      role: ""
    };
  },
  mounted() {
    this.socket.on("imgReady", (img, word, diff) => {
      this.$store.dispatch("setImage", img);
      this.$store.dispatch("setWord", word);
      this.$store.dispatch("setDiff", diff);
      if (this.role === "gueeser") {
        this.$router.push("/canvas");
      } else {
        sessionStorage.setItem("role", "painter");
        this.$router.push("/waiting");
      }
    }),
      this.socket.on("playerWon", () => {
        if (this.role === "painter") {
          sessionStorage.setItem("role", "gueeser");
          this.$router.push("/waiting");
          this.role = sessionStorage.getItem("role");
        } else {
          sessionStorage.setItem("role", "painter");
          this.$router.push("/game");
          this.role = sessionStorage.getItem("role");
        }
      });
  },
  created() {
    this.role = sessionStorage.getItem("role");
  }
};
</script>

<style>
.headline {
  width: 290px;
  margin: auto;
  margin-top: 52px;
  font-size: 38px;
}

.loading {
  height: 167px;
  margin-top: 53px;
  border-radius: 99px;
  border: 1px solid #ece8d9;
}
</style>
