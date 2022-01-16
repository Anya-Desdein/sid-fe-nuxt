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
            sensorIds: ['SENS-TEST-3H', 'SENS-TEST-2T']
          }
        },
        {
          id: 2,
          tileType: 'ListingTile',
          tileData: {
            sensorIds: ['SENS-TEST-1T', 'SENS-TEST-2T', 'SENS-TEST-3H']
          }
        },
        {
          id: 3,
          tileType: 'ChartTile',
          tileData: {
            sensorIds: ['14905677-3', '14905677-4'],
            startDate: new Date('2022-01-13T10:00:00'),
            endDate: new Date('2022-01-20T10:00:00'),
            preferredPointCount: 15,
          }
        },
        {
          id: 4,
          tileType: 'ControlTile',
          tileData: { deviceId: 'PLUG-1' }
        },

        {
          id: 5,
          tileType: 'ControlTile',
          tileData: { deviceId: 'PLUG-2' }
        },
        {
          id: 6,
          tileType: 'ControlTile',
          tileData: { deviceId: 'PLUG-1' }
        },
        {
          id: 7,
          tileType: 'ControlTile',
          tileData: { deviceId: 'PLUG-1' }
        },
        {
          id: 8,
          tileType: 'ControlTile',
          tileData: { deviceId: 'PLUG-1' }
        },
      ]
    };
  },
  methods: {
  }
}
</script>
