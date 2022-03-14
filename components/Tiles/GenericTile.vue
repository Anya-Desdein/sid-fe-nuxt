<template>
  <div class="generic-tile">
    <component :is="tileType" :tileData="tileData"></component>
  </div>
</template>

<script>
import ControlTile from '../Tiles/ControlTile.vue';
import ListingTile from '../Tiles/ListingTile.vue';
import ChartTile from '../Tiles/ChartTile.vue';

export default {
  components: {
    ControlTile,
    ListingTile,
    ChartTile,
  },
  props: {
    tileType: String,
    tileData: Object
  }
}
</script>


<style lang="scss" scoped>
  h2 {
    margin-bottom: 0.475rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
