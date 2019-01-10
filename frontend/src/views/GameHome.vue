<template>
  <div class='home'>
    <div class='top-text'>Who will you be Painter/Gueeser try now.</div>
    <div class='btns-section'>
      <button class='choice-btn' v-if="!this.painter" @click='bePainter()'>Painter</button>
      <button class='choice-btn' v-if="!this.gueeser" @click='beGueeser()'>Gueeser</button>
    </div>
    <button class='play-btn' @click='playGame()'>Play Now!</button>
  </div>
</template>

<script>
import io from 'socket.io-client';
import GameService from '../services/GameService.js';

export default {
  name: 'gameHome',
  data() {
    return {
      socket: io('localhost:3001'),
      gueeser: true,
      painter: true
    };
  },
  created() {
    GameService.query().then(words => this.$store.dispatch('setWords', words));
  },
  mounted() {
    this.socket.on('role', role => {
      sessionStorage.setItem('role', role);
    });
    this.socket.on('rolesActive', () => {
      this.gueeser = false;
      this.painter = false;
    });
    this.socket.on('setRole', role => {
      if (role === 'painter') {
        this.painter = true;
      } else {
        this.gueeser = true;
      }
    });
  },
  methods: {
    playGame() {
      const role = sessionStorage.getItem('role');
      const click = new Audio(require('../../public/click.mp3'))
      click.play()
      if (role === 'painter') {
        this.$router.push('/game');
      } else {
        this.$router.push('/waiting');
      }
    },
    beGueeser() {
      const click = new Audio(require('../../public/click.mp3'))
      click.play()
      sessionStorage.setItem('role', 'gueeser');
      this.gueeser = true;
      this.painter = true;
      this.socket.emit('setRole', 'gueeser');
    },
    bePainter() {
      const click = new Audio(require('../../public/click.mp3'))
      click.play()
      sessionStorage.setItem('role', 'painter');
      this.gueeser = true;
      this.painter = true;
      this.socket.emit('setRole', 'painter');
    },
  }
};
</script>

<style lang='scss'>
.play-btn {
  height: 300px;
  width: 294px;
  margin-top: 20px;
  border-radius: 152px;
  font-size: 40px;
  border: 1px solid black;
  cursor: pointer;
  background-color: #f8b500;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  margin-top: 80px;
}

.play-btn:hover {
  background-color: #ffcc40;
}
.top-text {
  height: 87px;
  width: 300px;
  margin: 40px auto;
  font-size: 33px;
}

.btns-section {
  margin-top: 20px;
}

.choice-btn {
  margin-top: 54px;
  margin-left: 20px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: #393e46;
  color: white;
  height: 47px;
  width: 116px;
  -webkit-text-stroke: 1px #000000;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s;
}

.choice-btn:hover {
  background-color: #676f7c;
}

.show {
  opacity: 1;
}
</style>