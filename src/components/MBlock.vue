<template>
  <div class="block"></div>
</template>

<style scoped>
  .block {
    background: #fefefe;
    border: 2px solid rgba(0, 0, 0, .15);
    border-radius: 10%;
    box-sizing: border-box;
    box-shadow: 0 3px 10px 1px rgba(0, 0, 0, .08), inset 0 4px 10px 0 rgba(255, 255, 255, 1);
    cursor: pointer;
    display: block;
    flex-basis: calc(33.33% - 10px);
    margin: 5px;
    overflow: hidden;
    position: relative;
    transform: scale(1);
    transition: .1s ease;
    will-change: transform;
  }

  .block::before {
    background: #24b6ac;
    content: "";
    display: block;
    opacity: 0;
    padding-top: 100%;
    transition: .1s ease;
    will-change: background, opacity;
  }

  .block.presented::before {
    background: yellow;
    opacity: 1;
  }

  .block.pushed {
    transform: scale(.9);
  }

  .block.pushed::before {
    background: #24b6ac;
    opacity: 1;
  }

  @keyframes light-up {
    0% {
      opacity: 0;
    }

    50% {
      opacity: .5;
    }

    100% {
      opacity: 0;
    }
  }
</style>
