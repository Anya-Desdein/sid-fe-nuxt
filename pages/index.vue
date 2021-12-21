<template>
  <div>
    <PageHeading title="Obecne dane">Ostatnia aktualizacja: 18:20</PageHeading>
    <div class="container page-container"> 
      <AppGrid>
        <div v-for="tile in tiles" :key="tile.id">
          <GenericTile :tileType="tile.tileType" :tileData="tile.tileData"></GenericTile>
        </div>
      </AppGrid>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tiles: [
        {
          id: 1,
          tileType: 'ListingTile',
          tileData: {
            sensorIds: [32348, 23974, 10283]
          }
        },
        {
          id: 2,
          tileType: 'ListingTile',
          tileData: {
            sensorIds: [123, 234, 345, 231]
          }
        },
        {
          id: 3,
          tileType: 'ControlTile',
          tileData: { sensorId: 123 }
        },
        {
          id: 4,
          tileType: 'ControlTile',
          tileData: { sensorId: 123 }
        },
        // 4
        {
          id: 5,
          tileType: 'ControlTile',
          tileData: { sensorId: 123 }
        },
        {
          id: 6,
          tileType: 'ControlTile',
          tileData: { sensorId: 123 }
        },
        {
          id: 7,
          tileType: 'ControlTile',
          tileData: { sensorId: 123 }
        },
        {
          id: 8,
          tileType: 'ControlTile',
          tileData: { sensorId: 123 }
        },
      ]
    };
  },
  methods: {
  }
}
</script>
