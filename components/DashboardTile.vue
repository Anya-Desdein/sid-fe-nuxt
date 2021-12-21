/*  nic nie robi */

<template>
  <div class="DashboardTile">
    <div class="tile-header">
      <h2>Nazwę urzzzzzzdupazzzzzzzzz</h2>
    </div>
    <div class="tile-content">
    <button-on-off labelTrue='Auto' labelFalse='Manual' :state="autoAnabled" @click="autoAnabled = !autoAnabled"></button-on-off>
    <button-on-off labelTrue='Włącz' labelFalse='Wyłącz' :state="tileState" @click="tileState = !tileState"></button-on-off>
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
 
 .tile-header {
    margin-bottom: 0.9rem;
    padding: 0;
    text-align: left;
  }
  h2 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  
   .tile-content > * {
     margin-bottom: 0.5rem;
   }
</style>