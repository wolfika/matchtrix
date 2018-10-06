<template>
  <button class="btn" @click.prevent="goTo(to)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MButton',
  props: ['to'],
  methods: {
    goTo(target) {
      if (!target) {
        return;
      }

      this.$router.push(target);
    },
  },
};
</script>

<style scoped>
  .btn {
    appearance: none;
    background: #1A936F;
    border: 0;
    border-radius: 3px;
    color: #fff;
    display: block;
    font-family: inherit;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 1px;
    margin: 0 auto;
    padding: 10px 20px;
    outline: none;
    text-align: center;
    text-transform: uppercase;
    text-shadow: 0 2px 0px rgba(0, 0, 0, .25);
    width: 80%;
  }
</style>
