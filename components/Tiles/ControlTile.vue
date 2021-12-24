
<template>
  <div class="control-tile">
    <TileHeading>Nazwa asdasd as das das dasdasdasdasdasd</TileHeading>
    <div class="tile-content">
      <button-on-off labelTrue='Auto' labelFalse='Manual' :state="autoAnabled" @click="autoAnabled = !autoAnabled"></button-on-off>
      <button-on-off 
        :style="{opacity: autoAnabled ? 0.6 : 1, pointerEvents: autoAnabled ? 'none' : 'all'}" 
        labelTrue='Włącz' labelFalse='Wyłącz' :state="tileState" @click="tileState = !tileState"
      ></button-on-off>
    </div>
  </div>
</template>

<script>
export default {
   data() {
    return {
      tileState: false, 
      autoAnabled: false,
    };
  }, 
}
</script>

<style lang="scss" scoped>

  .tile-content > * {
    margin-bottom: 0.5rem;
    -webkit-user-select: none; 
    -moz-user-select: none;     
    -ms-user-select: none;  
    user-select: none;  
  }

  @include bp(max-square) {
   .tile-content > * {
      margin-left: auto;
      margin-right: auto;
   }
  }
</style>