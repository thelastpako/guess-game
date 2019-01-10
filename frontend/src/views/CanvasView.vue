<template>
  <section v-if="this.$store.getters.getBaseImg || this.role === 'painter'">
    <div v-if="!this.win" class="heads">
      <h1
        class="headline"
        v-if="this.$store.state.selectedWord && this.role === 'painter'"
      >{{this.selectedWord}}</h1>
      <h1 class="headline" v-if="this.role === 'gueeser'">Guess what in the paint</h1>
      <canvas
        id="canvas"
        v-on:mousedown="handleMouseDown"
        v-on:mouseup="handleMouseUp"
        v-on:mousemove="handleMouseMove"
        width="340px"
        height="340px"
      ></canvas>
      <br>
      <div class="edit-section" v-if="role === 'painter'">
        <input type="color" id="color" v-model="color.color" value="#ffffff" :style="{opacity:0}">
        <label for="color">
          <i class="fas fa-palette"></i>
        </label>
        <label for="bgcolor">
          <i class="fas fa-fill-drip"></i>
        </label>
        <input
          type="color"
          id="bgcolor"
          v-model="color.bg"
          value="#ffffff"
          :style="{opacity:0}"
          @change="changeBG()"
        >
        
        <i class="fas fa-trash-alt" @click="clearCanvas()"></i>
        <br>

        <button class="send" @click="saveCanvas()">Save</button>
      </div>
      <input class="guess-input" v-if="this.role === 'gueeser'" v-model="guess" maxlength="7">
      <div class="bottom-later-container">
        <div class="time-box" v-if="this.role === 'gueeser'">Time: {{this.bestTime}}</div>
        <button class="guess-btn" v-if="this.role === 'gueeser'" @click="checkGuess()">Check Guess</button>
      </div>
    </div>
    <div class="winner" v-if="this.win">
      <h1>You Right! and you Scored:
        <div class="win-ptns">{{getDifficultyPoints()}}</div>Points!!
      </h1>
      <button class="paint-btn" @click="goPaint()">Go Paint!</button>
    </div>
  </section>
</template>

<script>
import io from "socket.io-client";

export default {
  data: function() {
    return {
      mouse: {
        current: {
          x: 0,
          y: 0
        },
        previous: {
          x: 0,
          y: 0
        },
        down: false
      },
      color: {
        bg: "#ffffff",
        color: "black"
      },
      role: null,
      socket: io("localhost:3001"),
      selectedWord: "",
      guess: "",
      win: false,
      diff: null,
      timeInterval: null,
      bestTime: 0,
      canvasHistory: []
    };
  },
  created() {
    this.time = localStorage.getItem("time");
    this.role = sessionStorage.getItem("role");
    this.selectedWord = this.$store.getters.getSelectedWord;
    this.diff = this.$store.getters.getDiff;
    if(this.role === 'gueeser'){
     this.socket.emit("drawImage");
    }
  },
  mounted() {
    this.socket.on("draw", () => {
      this.drawPic();
    });
  },
  computed: {
    currentMouse: function() {
      var c = document.getElementById("canvas");
      var rect = c.getBoundingClientRect();

      return {
        x: this.mouse.current.x - rect.left,
        y: this.mouse.current.y - rect.top
      };
    },
  },
  methods: {
    changeBG() {
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");

      ctx.beginPath();
      ctx.rect(0, 0, 400, 400);
      ctx.fillStyle = this.color.bg;
      ctx.fill();
    },
      getDifficultyPoints() {
      if (this.diff === "easy") return 1;
      else if (this.diff === "medium") return 3;
      else if (this.diff === "hard") return 5;
    },
    checkGuess() {
      const lower = this.guess.toLowerCase();
      let score = this.$store.getters.getScore;
      if (lower === this.selectedWord) {
        clearInterval(this.timeInterval);
        this.win = true;
        if (this.diff === "easy") score += 1;
        else if (this.diff === "medium") score += 3;
        else if (this.diff === "hard") score += 5;
        this.$store.dispatch("setScore", score);
        this.checkTime();
        const win = new Audio(require('../../public/win.mp3'))
        win.play()
      } else {
        const wrong = new Audio(require('../../public/wrong.mp3'))
        wrong.play()
      }
    },
    goPaint() {
      sessionStorage.setItem("role", "painter");
      this.socket.emit("playerWon");
      const click = new Audio(require('../../public/click.mp3'))
      click.play()
    },
    clearCanvas() {
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");

      ctx.beginPath();
      ctx.rect(0, 0, 400, 400);
      ctx.fillStyle = this.color.bg;
      ctx.fill();
    },
    saveCanvas() {
      const click = new Audio(require('../../public/click.mp3'))
      click.play()
      var c = document.getElementById("canvas");
      var img = c.toDataURL();
      this.socket.emit("imgReady", img, this.selectedWord, this.diff);
      this.$router.push("/waiting");
    },
    renderTime() {
      this.bestTime++;
    },
    checkTime() {
      const time = localStorage.getItem("time");
      if (!time || time >= this.bestTime) {
        localStorage.setItem("time", this.bestTime);
        this.$store.dispatch("setBestTime", this.bestTime);
      }
    },
    drawPic() {
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");

      this.timeInterval = setInterval(this.renderTime, 1000);
     
      var image = new Image();
      image.onload = function() {
        ctx.drawImage(image, 0, 0);
      };
      image.src = this.$store.getters.getBaseImg;
    },
    draw() {
      if (this.mouse.down && this.role === "painter") {
        var c = document.getElementById("canvas");

        var ctx = c.getContext("2d");
        ctx.lineTo(this.currentMouse.x, this.currentMouse.y);
        ctx.strokeStyle = this.color.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        var imgData = ctx.getImageData(0, 0, c.width, c.height);
        this.canvasHistory.push(imgData)
      }
    },
    handleMouseDown: function(event) {
      this.mouse.down = true;
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      };

      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");

      ctx.moveTo(this.currentMouse.x, this.currentMouse.y);
    },
    handleMouseUp: function() {
      this.mouse.down = false;
    },
    handleMouseMove: function(event) {
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      };
      this.draw(event);
    }
  }
};
</script>

<style lang="scss" scoped>
.paint-btn {
  border: 1px solid black;
  font-size: 40px;
  margin-top: 60px;
  height: 100px;
  padding: 10px;
  border-radius: 32px;
  background-color: #f8b500;
  color: white;
  -webkit-text-stroke: 1px #39466c;
  cursor: pointer;
  transition: all .3s;
}

.paint-btn:hover{
    background-color: #ffcf4a;
}

#canvas {
  border: 1px solid black;
  margin-top: 30px;
  background-color: white;
}

.fa-palette:before {
  font-size: 40px;
  cursor: pointer;
}

.fa-palette:hover {
  color: #626975;
}

.fa-fill-drip:before {
  font-size: 40px;
  margin-left: 20px;
  cursor: pointer;
}

.fa-fill-drip:hover {
  color: #626975;
}

.fa-trash-alt:before {
  font-size: 40px;
  cursor: pointer;
  margin-right: 55px;
  transition: all 0.3s;
}

.fa-trash-alt:hover {
  color: #626975;
}

.send {
  font-size: 40px;
  margin-top: 20px;
  background-color: #f8b500;
  border-radius: 10px;
  border: 1px solid black;
  cursor: pointer;
}

.send:hover {
  transition: all 0.3s;
  background-color: #ffce48;
}

.headline {
  margin-top: 20px;
}

.guess-input {
  height: 72px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: #00adb5;
  color: white;
  font-size: 40px;
  margin-top: 10px;
  width: 207px;
  display: block;
  margin: 14px auto;
  padding: 0 10px;
  text-align: center;
}

.guess-btn {
  background-color: #f8b500;
  border: 1px solid black;
  border-radius: 13px;
  font-size: 20px;
  cursor: pointer;
}

.guess-btn:hover{
    background-color: #ffcb3b;
}

.bottom-later-container {
  display: flex;
  justify-content: space-around;
  height: 60px;
}

.time-box {
  font-size: 26px;
  line-height: 60px;
}

.show-btn {
  border: 1px solid black;
  background-color: #f8b500;
  border-radius: 10px;
  color: #393e46;
  font-size: 20px;
}

.winner {
  width: 260px;
  font-size: 30px;
  margin: auto;
  margin-top: 49px;
}

.win-ptns {
  color: #f8b500;
  font-size: 100px;
}
</style>
