<template>
  <div class="dynamic-tile">
    <TileHeading>{{heading}}</TileHeading>
    <div class="dynamic-tile__lines" v-if="lines && lines.length">
      <p v-for="line in lines" :key="line.id">{{line.label}}: {{line.value}}</p>
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
      lines: [],
    }
  },
  async fetch() {
    setTimeout(() => {
      this.heading = "Loaded!"
      this.lines = this.tileData.sensorIds.map(id => ({id, label: id, value: ~~(Math.random() * 100)}))
    }, 500);
  }
}
</script>

<style lang="scss" scoped>

</style>
