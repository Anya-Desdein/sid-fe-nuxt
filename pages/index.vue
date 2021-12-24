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
          tileType: 'ChartTile',
          tileData: {
            sensorIds: [2, 3],
            startDate: new Date('2021-12-24T10:00:00'),
            endDate: new Date('2021-12-26T010:00:00'),
            preferredPointCount: 10,
          }
        },
        {
          id: 4,
          tileType: 'ControlTile',
          tileData: { sensorId: 123 }
        },

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
