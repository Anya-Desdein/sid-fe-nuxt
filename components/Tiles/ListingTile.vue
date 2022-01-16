<template>
  <div class="dynamic-tile">
    <TileHeading>{{heading}}</TileHeading>
    <div class="dynamic-tile__lines" v-if="sensors && sensors.length">
      <p v-for="sensor in sensors" :key="sensor.id">{{sensor.displayName}}: {{sensor.latestValue}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tileData: Object,
  },
  data() {
    return {
      heading: 'Loading...',
      sensors: [],
    }
  },
  async fetch() {
    const url = `/api/get-sensor-list/` + this.tileData.sensorIds.join(',');
    
    const data = await this.$axios.$get(url);
    if(!data.sensors) {
      throw "Can't load sensors!";
    }

    this.heading = "Loaded!";

    this.sensors = data.sensors;

    // setTimeout(() => {
    //   // ~~ to podwójna negacja bitowa i działa jak math floor 
    //   this.lines = this.tileData.sensorIds.map(id => ({id, label: id, value: ~~(Math.random() * 100)}))
    // }, 500);
  }
}
</script>

<style lang="scss" scoped>

</style>
