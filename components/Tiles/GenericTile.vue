<template>
  <div class="generic-tile">
    <component :is="tileType" :tileData="tileData"></component>
  </div>
</template>

<script>
import ControlTile from '../Tiles/ControlTile.vue';
import ListingTile from '../Tiles/ListingTile.vue';

export default {
  components: {
    ControlTile,
    ListingTile,
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
  }
  
  p, h2 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  p {
    margin-left: 0.71rem;
  }
</style>
