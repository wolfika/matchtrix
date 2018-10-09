<template>
  <div class="game">
    <div class="navigation">
      <div class="col left">
        <router-link class="back" to="startScreen">
          <span class="key">back to</span>
          <div class="value">menu</div>
        </router-link>
      </div>

      <div class="col center">
        <span class="key">level</span>
        <span class="value">{{level}}</span>
      </div>

      <div class="col right">
        <span class="key">time</span>
        <span class="value">{{timeLeft}} sec</span>
      </div>
    </div>

    <div class="board-wrapper">
      <div class="countdown" :class="{visible: countdown > 0}">
        {{countdown}}
      </div>

      <div class="state" :class="{visible: niceState !== null}">
        {{niceState}}
      </div>

      <div class="board" :class="{disabled: state !== 'input'}">
        <m-block v-for="blockId in blocks"
                :key="blockId"
                @click.native="blockTouched($event, blockId)"
                :class="{presented: presentedBlock === blockId}"></m-block>
      </div>
    </div>
  </div>
</template>

<script>
import MBlock from '@/components/MBlock';

export default {
  name: 'Game',
  components: {
    MBlock,
  },
  data() {
    return {
      blocks: [...Array(9).keys()],
      level: 0,
      input: [],
      solution: [],
      isPresenting: false,
      state: 'start',
      presentedBlock: null,
      timeLeft: 0,
      inputInterval: null,
      countdown: 3,
    };
  },
  computed: {
    niceState() {
      switch (this.state) {
        case 'input':
          return 'Your turn';
        case 'presentation':
          return 'Presenting';
        default:
          return null;
      }
    },
  },
  watch: {
    input(newInput) {
      if (this.state !== 'input') {
        return;
      }

      if (
        newInput[newInput.length - 1] !== this.solution[newInput.length - 1]
      ) {
        this.handleWrongMatch();
        return;
      }

      if (newInput.length !== this.solution.length) {
        return;
      }

      this.handleWin();
    },
  },
  methods: {
    getRandomBlockId() {
      return Math.floor(Math.random() * this.blocks.length);
    },
    generateSolution() {
      let n = Math.max(2, this.level + 1);
      this.solution = [];

      while (n--) {
        this.solution.push(this.getRandomBlockId());
      }
    },
    blockTouched($event, blockId) {
      const blockElement = $event.target;

      if (this.isPresenting) {
        return;
      }

      blockElement.classList.add('pushed');

      setTimeout(() => {
        blockElement.classList.remove('pushed');
      }, 150);

      this.input.push(blockId);
    },
    presentSolution() {
      let presentationInterval = null;
      const blocksToPresent = Array.from(this.solution);
      const presentBlock = () => {
        if (!blocksToPresent.length) {
          this.presentedBlock = null;
          clearInterval(presentationInterval);

          setTimeout(() => {
            this.isPresenting = false;
            this.startUserInput();
          }, 1000);
        }

        if (this.presentedBlock === null) {
          this.presentedBlock = blocksToPresent.shift();
          return;
        }

        this.presentedBlock = null;
      };

      this.isPresenting = true;
      this.state = 'presentation';

      presentationInterval = setInterval(presentBlock, 650);
    },
    startUserInput() {
      this.state = 'input';

      this.inputInterval = setInterval(() => {
        if (this.timeLeft < 1) {
          this.handleInputTimeout();
          return;
        }

        this.timeLeft -= 1;
      }, 1000);
    },
    stopInputInterval() {
      clearInterval(this.inputInterval);
    },
    countdownTimer() {
      return new Promise((resolve) => {
        let countdownInterval = null;

        this.stopInputInterval();
        this.countdown = 3;
        this.state = 'countdown';

        const decrementCountdown = () => {
          this.countdown -= 1;

          if (this.countdown === 0) {
            clearInterval(countdownInterval);
            return resolve();
          }

          return null;
        };

        countdownInterval = setInterval(decrementCountdown, 1000);
      });
    },
    handleWin() {
      this.stopInputInterval();
      this.state = 'matched';
      this.advanceLevel();
      // this.$router.push('win');
    },
    handleWrongMatch() {
      this.stopInputInterval();
      this.state = 'wrong';
      // this.$router.push('lose');
    },
    handleInputTimeout() {
      this.stopInputInterval();
      this.state = 'timeout';
      // this.$router.push('lose');
    },
    advanceLevel() {
      this.input = [];
      this.level += 1;
      this.generateSolution();
      this.timeLeft = this.solution.length + 1;

      this.countdownTimer()
        .then(() => {
          this.presentSolution();
        });
    },
  },
  mounted() {
    this.advanceLevel();
  },
};
</script>

<style scoped>
.game {
  background: #243447;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.navigation {
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 80px;
  justify-content: space-between;
  position: relative;
  z-index: 10;
}

.navigation .back {
  color: inherit;
  text-decoration: none;
}

.navigation .col {
  flex: 1 1 33.33%;
  padding: 0 20px;
}

.col.left {
  text-align: left;
}

.col.center {
  text-align: center;
}

.col.right {
  text-align: right;
}

.col .key {
  display: block;
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 5px;
}

.col .value {
  display: block;
  font-size: 20px;
}

.board-wrapper {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin-top: -80px;
  padding: 0 5px;
  position: relative;
}

.countdown {
  align-items: center;
  background: rgba(0, 0, 0, .8);
  border-radius: 50%;
  border: 5px solid lightgrey;
  bottom: 0;
  box-shadow: 0 6px 15px 1px rgba(0, 0, 0, .35);
  color: #fff;
  display: flex;
  flex-direction: row;
  font-size: 35vw;
  font-weight: 800;
  height: 60vw;
  justify-content: center;
  left: 0;
  margin: auto;
  opacity: 0;
  position: absolute;
  right: 0;
  text-align: center;
  transform: scale(.5);
  transition: .25s ease;
  top: 0;
  visibility: hidden;
  width: 60vw;
  will-change: opacity, transform, visibility;
  z-index: 5;
}

.countdown.visible {
  opacity: 1;
  transform: scale(1);
  visibility: visible;
}

.state {
  align-items: center;
  display: flex;
  font-size: 32px;
  font-weight: 800;
  height: 50px;
  justify-content: center;
  margin: 0 0 4vh;
  opacity: 0;
  visibility: hidden;
}

.state.visible {
  opacity: 1;
  visibility: visible;
}

.board {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  z-index: 1;
}

.board.disabled {
  cursor: not-allowed;
}

.board.disabled > div {
  pointer-events: none;
}
</style>
