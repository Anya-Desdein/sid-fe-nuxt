<template>
  <div class="container">
    <div class="max-portrait">max-portrait</div>
    <div class="min-square">min-square</div>
    <div class="max-square">max-square</div>
    <div class="min-landscape">min-landscape</div>
    <div class="not-square">not-square</div>
  </div>
</template>

<style lang="scss">
.max-portrait { 
  opacity: 0.2;
  @include bp(max-portrait) {
    opacity: 1;
  }
}
.min-square { 
  opacity: 0.2;
  @include bp(min-square) {
    opacity: 1;
  }
}
.max-square { 
  opacity: 0.2;
  @include bp(max-square) {
    opacity: 1;
  }
}
.min-landscape { 
  opacity: 0.2;
  @include bp(min-landscape) {
    opacity: 1;
  }
}
.not-square { 
  opacity: 0.2;
  @include bp(not-square) {
    opacity: 1;
  }
}
</style>
