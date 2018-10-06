<template>
  <div class="start-screen">
    <m-button class="start-button" to="game">Play</m-button>
  </div>
</template>

<script>
import MButton from '@/components/MButton';

export default {
  name: 'startScreen',
  components: {
    MButton,
  },
};
</script>

<style scoped>
  .start-screen {
    background: #F3E9D2;
    height: 100%;
  }

  .start-button {
    bottom: 120px;
    position: absolute;
    left: 0;
    margin: auto;
    right: 0;
  }
</style>
