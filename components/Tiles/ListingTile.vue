<template>
  <div class="dynamic-tile">
    <TileHeading>{{heading}}</TileHeading>
    <div class="dynamic-tile__lines" v-if="lines && lines.length">
      <p v-for="line in lines" :key="line.id">{{line.label}}: {{line.value}}</p>
    </div>
    <!-- <ul>
        <li>Pokój A: 32C</li>
        <li>Pokój B: 28C</li>
        <li>Pokój A: 50% RH</li>
        <li>Pokój B: 90% RH</li>
      </ul> -->
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
