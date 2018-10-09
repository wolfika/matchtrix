<template>
  <div class="block"></div>
</template>

<style scoped>
  .block {
    background: #fafafa;
    border: 2px solid rgba(0, 0, 0, .15);
    border-radius: 10%;
    box-sizing: border-box;
    box-shadow: 0 3px 10px 1px rgba(0, 0, 0, .08);
    cursor: pointer;
    display: block;
    flex-basis: calc(33.33% - 10px);
    margin: 5px;
    overflow: hidden;
    position: relative;
    transform: scale(1);
    transition: background .1s linear, transform .125s ease;
    will-change: background, transform;
    z-index: 1;
  }

  .block::before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  .block.presented {
    background: #FACF5A;
  }

  .block.pushed {
    background: #2EC9E6;
    transform: scale(.925);
  }
</style>
