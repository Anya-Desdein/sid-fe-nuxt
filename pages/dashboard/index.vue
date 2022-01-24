<template>
  <div>
    <PageHeading>Ostatnia aktualizacja: 18:20</PageHeading>
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
          id: 3,
          tileType: 'ChartTile',
          tileData: {
            sensorIds: ['14905677-3', '14905677-4'],
            startDate: new Date('2022-01-13T10:00:00'),
            endDate: new Date('2022-01-20T10:00:00'),
            preferredPointCount: 15,
          }
        },
      ]
    };
  },
  methods: {
  },
  async fetch() {
    let data = await this.$axios.$get(`/api/get-sensor-list`);
    if(!data || !data.sensors) throw "Can't load sensors!";
    const { sensors } = data;

    data = await this.$axios.$get(`/api/get-device-list`);
    if(!data || !data.devices) throw "Can't load device list!";
    const { devices } = data;

    

    this.tiles = [
      ...sensors.map(sensor => {
        return {
          id: 'chart-' + sensor.id,
          tileType: 'ChartTile',
          tileData: { 
            sensorIds: [ sensor.id ],
            startDate: new Date(new Date() - 1000 * 60 * 60 * 1 * 1),
            endDate: new Date(new Date() + 1000 * 60),
            preferredPointCount: 5, 
          }
        }
      }),

      ...sensors.map(sensor => {
        return {
          id: 'listing-' + sensor.id,
          tileType: 'ListingTile',
          tileData: { 
            sensorIds: [ sensor.id ],
          }
        }
      }),
            ...devices.map(device => {
        return {
          id: 'control-' + device.id,
          tileType: 'ControlTile',
          tileData: { deviceId: device.id }
        }
      })
    ];

  }
}
</script>
