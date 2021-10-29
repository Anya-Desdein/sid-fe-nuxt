<template>
 <div class="tileList">
   <tile-on-off></tile-on-off>
   <tile-on-off></tile-on-off>
   <tile-sensor-list></tile-sensor-list>
   <tile-sensor-graph />
 </div>
</template>

<script>

export default {
  data() {
    return {
    };
  }, 
}
</script>

<style lang="scss" scoped>
.tileList {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  gap: 1em 1em;
  margin: 1em 0em;
  grid-auto-flow: row;
}

</style>