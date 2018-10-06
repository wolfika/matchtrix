<template>
  <div class="game">
    <div>
      <pre>
        level: {{level}}
      </pre>
    </div><div>
      <pre>
        time left: {{timeLeft}}
      </pre>
    </div>
    <div>
      <pre>
        state: {{state}}
      </pre>
    </div>

    <div class="board" :class="{disabled: state !== 'input'}">
      <m-block v-for="blockId in blocks"
               :key="blockId"
               @click.native="blockTouched($event, blockId)"
               :class="{presented: presentedBlock === blockId}"></m-block>
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
    };
  },
  watch: {
    input(newInput) {
      if (this.state !== 'input') {
        return;
      }

      if (newInput[newInput.length - 1] !== this.solution[newInput.length - 1]) {
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
          const currentBlock = blocksToPresent.shift();

          this.presentedBlock = currentBlock;
          return;
        }

        this.presentedBlock = null;
      };

      this.isPresenting = true;
      this.state = 'presentation';

      presentationInterval = setInterval(presentBlock, 800);
      presentBlock();
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

      this.presentSolution();
    },
  },
  mounted() {
    this.advanceLevel();
  },
};
</script>

<style scoped>
  .game {
    align-items: center;
    background: #F3E9D2;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding: 0 20px;
  }

  .board {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .board.disabled {
    cursor: not-allowed;
  }

  .board.disabled > div {
    pointer-events: none;
  }
</style>
