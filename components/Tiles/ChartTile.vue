<template>
  <div class="chart-tile">
    <TileHeading :title="heading">{{heading}}</TileHeading>
    <canvas ref="graphCanvas"></canvas>
    <div class="chart-legend" v-if="graphData.length >= 2">
      <div class="chart-legend-item" v-for="obj in graphData" :key="obj.id"
        :style="{'border-bottom-color': obj.borderColor}">
        {{ obj.label }}
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import { mapMutations } from 'vuex'

Chart.defaults.font.size = 14;
Chart.defaults.color = '#BEAC8F';
Chart.defaults.font.family ="'Xanh Mono', monospace";
console.log("DEFAULTS:", Chart.defaults);

export default {
  props: {
    tileData: Object,
  },

  data() {
    return {
      heading: '...',
      data: [],
      graphData: [],
      graph: null,
      destroyed: false,
      styles: [
        {
          backgroundColor: '#FF487A',
          borderColor: '#FF487A ',
        },{
          backgroundColor: '#E50853',
          borderColor: '#E50853',
        },{
          backgroundColor: '#BCA98A',
          borderColor: '#BCA98A',
        },
        {
          backgroundColor: '#8F8ABC',
          borderColor: '#8F8ABC',
        }
      ]
      
    };
  },

  beforeDestroy() {
    this.destroyed = true;
    if(this.graph) {
      this.graph.destroy();
      this.graph = null;
    }
  },

  methods: {
    updateGraph() {
      if(this.graph === null) {
        const config = {
          type: 'line',
          data: {
            datasets: this.graphData,
          },
          
          options: {
            scales: {
              x: {
                type: 'time',
                time: {
                  // Luxon format string
                  tooltipFormat: 'DD T',
                  displayFormats: {
                      millisecond: 'HH:mm:ss.SSS',
                      second: 'HH:mm:ss',
                      minute: 'HH:mm',
                      hour: 'HH'
                  }
                },
                title: {
                  display: false,
                  text: 'Date'
                },
                 grid: {
                  borderColor: 'transparent', 
                  display: false
                },
              },
              y: {
                title: {
                  display: false,
                  text: 'Temperature'
                },
                 grid: {
                  borderColor: 'transparent', 
                  display: false
                }
              },
            },
            plugins: {
              legend: {
                display: false,
              }
            }
          }
        };
        setTimeout(() => {
          if(this.destroyed) return;
          this.graph = new Chart(
            this.$refs.graphCanvas,
            config
          );
        }, 500);
      }else{
        // graph exista
        this.graph.data.datasets = this.graphData;
        this.graph.update('none');
      }
    },
    ...mapMutations({
      updateLastUpdated: 'appStore/updateLastUpdated',
    }),
  },

  async fetch() {
    const sensorIds = this.tileData.sensorIds;

    const url = `/api/get-sensor-list/` + this.tileData.sensorIds.join(',');
    const data = await this.$axios.$get(url);
    if(!data || !data.sensors || !data.sensors.length) {
      throw "Can't load sensor info for "+this.tileData.sensorIds+"!";
    }

    const params = [];
    let { startDate, endDate, title } = this.tileData;
    if(this.tileData.startDateAgo) startDate = new Date(new Date().getTime() + this.tileData.startDateAgo); 
    if(this.tileData.endDateAgo) endDate = new Date(new Date().getTime() + this.tileData.endDateAgo); 
    if(startDate && !isNaN(+startDate)) params.push(`from=${startDate.toISOString()}`);
    if(endDate && !isNaN(+endDate)) params.push(`to=${endDate.toISOString()}`);
    const histories = await Promise.all(sensorIds.map(sensorId => 
      this.$axios.$get(`/api/get-sensor-history/${sensorId}?${params.join('&')}`)
    ));

    const sensors = data.sensors;
    const sensorMap = new Map();
    sensors.forEach(sensor => sensorMap.set(sensor.id, sensor));

    this.heading = "No sensors";
    if(data.sensors.length) {
      this.heading = `${sensors.length} sensors`;

      if(sensors.length === 1) {
        const name = sensors[0].displayName;
        if(name) {
          this.heading = name;
        }
      }
      
      if(this.tileData.title) {
        this.heading = this.tileData.title;
      }
    }
    
    let latestDate = null;
    this.data = histories.map(({sensorId, data}) => {
      const sensor = sensorMap.get(sensorId);

      return {
        sensorName: sensor.displayName,
        data: data.map(({value, readingDate}) => {
          const x = new Date(readingDate);
          if(latestDate === null || x > latestDate) {
            latestDate = x;
          }
          return {
            x,
            y: value
          };
        })
      };
    })

    this.graphData = this.data.map((obj, i) => ({
      id: i, // todo: replace with id from server
      label: obj.sensorName,
      backgroundColor: this.styles[i % this.styles.length].backgroundColor,
      borderColor: this.styles[i % this.styles.length].borderColor,
      data: obj.data,
      pointRadius: 1.1,
    }));


    this.updateGraph();
    
    if(latestDate) {
      this.updateLastUpdated(latestDate);
    }

    setTimeout(() => this.$fetch(), 5000)
  }
}
</script>

<style lang="scss" scoped>
ul {
  text-align: left; 
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  
  @include bp(max-square) {
    justify-content: center;
  }
  
  &-item {
    display: inline-block;
    margin-top: 0.4rem;
    border-bottom: $color-primary 0.125rem solid;
    line-height: 1;
    margin-right: 0.4rem;
    font-size: 0.75rem;
  
    @include bp(max-square) {
      margin: 0.4rem 0.2rem 0;
    }
  }
}

</style>