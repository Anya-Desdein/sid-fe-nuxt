<template>
  <div class="button-on-off" :class="{'button-on-off--on': state}" @click="clicked">
    <div class="button-on-off__slider">
      <div class="off">{{labelTrue}}</div>
      <div class="button-on-off__knob"></div>
      <div class="on">{{labelFalse}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    state: Boolean,
    labelTrue: String,
    labelFalse: String
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
$border: .0625rem;

.button-on-off {
  height: 1.8rem;
  text-align: center;
  width: $label + $border + $border + $label;
  overflow: hidden;
  border: $border solid $color-primary;
  border-radius: 0.8rem;
  cursor: pointer;
  user-select: none;
}

.button-on-off__slider {
  height: 100%;
  display: flex;
  overflow: hidden;
  position: relative;
}

.button-on-off__slider > * {
  display: inline-block;
  width: $label;
  z-index: 200;
  box-sizing: content-box;
  position: relative;
}

.button-on-off .off {
   color: $color-text-inactive;
}
.button-on-off .on {
   color: $color-primary;
}

.button-on-off--on .on {
 color: $color-text-inactive; 
} 

.button-on-off--on .off{
  color: $color-primary;
}

.button-on-off__slider > .off, .button-on-off__slider > .on {
  padding-top: 0.18rem;
}

.button-on-off__slider > .button-on-off__knob {
  position: absolute;
  top:0;
  left:50%;
  height: 1.8rem - $border * 2;
  width: $label;
  border: $border solid $color-primary;
  border-radius: 0.8rem;
  margin: -$border;
  transition: 0.18s transform ease-out;
  z-index: -19;
  overflow: hidden;
  .button-on-off--on & {
    transform: translateX(-100%);
  }
}
.button-on-off__slider > .button-on-off__knob:after{
  content: "";
  display: block;
  height: 2.6rem;
  background-image: radial-gradient($color-secondary, $color-background);
  position: relative;
  transform: translateY(-0.7rem);
  z-index: -20;
  border-radius: 0.8rem;
  opacity: 0.5;
}
</style>