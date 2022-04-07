<template>
  <div>
    <PageHeading>
      <LastUpdated></LastUpdated>
    </PageHeading>
    <GridPages :tiles="tiles" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tiles: []
    };
  },
  async fetch() {
    let data = await this.$axios.$get(`/api/get-sensor-list`);
    if(!data || !data.sensors) throw "Can't load sensors!";
    const { sensors } = data;

    data = await this.$axios.$get(`/api/get-device-list`);
    if(!data || !data.devices) throw "Can't load device list!";
    const { devices } = data;

    const asd = { a: 5, b: 10 };
    const asd2 = { a: 15, C: 10 };
    console.log({ ...asd, ...asd2, qwe: 123 })
    
    this.tiles = [
      ...sensors.map(sensor => {
        return {
          id: 'chart-' + sensor.id,
          tileType: 'ChartTile',
          tileData: { 
            sensorIds: [ sensor.id ],
            startDate: new Date(new Date() - 1000 * 60 * 60 * 5 * 1),
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
