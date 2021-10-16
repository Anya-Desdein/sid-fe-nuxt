<template>
  <div class="button-on-off" :class="{'button-on-off--on': state}" @click="clicked">
    <div class="button-on-off__slider">
      <span>OFF</span>
      <span class="button-on-off__knob"></span>
      <span>ON</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    state: Boolean,
  },
  methods: {
    clicked() {
      this.$emit('click', this.state);
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.button-on-off {
  width: 5em;
  height: 1.5em;
  overflow: hidden;
  border: 2px solid #ccc;
  box-sizing: content-box;
}
.button-on-off .button-on-off__slider {
  transition: 0.15s transform ease-out;
  transform: translateX(0);
}
.button-on-off--on .button-on-off__slider {
  transform: translateX(-3em);
}
.button-on-off__slider {
  height: 100%;
  width: 8em;
  display: flex;
  justify-content: space-between;
}
.button-on-off__slider > span {
  display: inline-block;
  width: 3em;
}
.button-on-off__slider > .button-on-off__knob {
  border: 4px solid #666;
  width: 2em;
}
</style>