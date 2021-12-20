<template>
  <div class="button-on-off" :class="{'button-on-off--on': state}" @click="clicked">
    <div class="button-on-off__slider">
      <div class="off">Auto</div>
      <div class="button-on-off__knob"></div>
      <div class="on">Manual</div>
    </div>
    <div class="gradient"></div>
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

<style scoped lang="scss">

$label: 3.8rem;
$knob: 3.8rem;
$border: .0625rem;

.button-on-off {
  height: 1.6rem;
  width: $border + $label + $knob + $border;
  overflow: hidden;
  border: $border solid #BEAC8F;
  border-radius: 0.75rem;
}

.button-on-off__slider {
  height: 100%;
  width: $label + $border + $knob + $border + $label;
  display: flex;
  overflow: hidden;
  // position:relative;
}

.button-on-off__slider > * {
  display: inline-block;
  width: $label;
  z-index: 200;
  box-sizing: content-box;
}

.button-on-off__slider {
  transition: 0.15s transform ease-out;
  transform: translateX(0);

  .button-on-off--on & {
    transform: translateX(-$label);
  }
}

.button-on-off__slider > .button-on-off__knob {
  height: 1.6rem - $border * 2;
  width: $knob;
  border: $border solid #BEAC8F;
  border-radius: 0.75rem;
  margin: -$border;
}

.gradient {
  height: 2.4rem;
  transform: translateY(-2rem);
  background-image: radial-gradient(#9B2948, #231420);
  opacity: 0.6;
  z-index: -1;
  position: relative;
}
</style>