<template>
  <div class="chart-tile">
    <TileHeading>{{heading}}</TileHeading>
    <canvas ref="graphCanvas"></canvas>
    <div class="chart-legend">
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

export default {
  props: {
    tileData: Object,
  },

  data() {
    return {
      heading: 'Loading...',
      data: [],
      graphData: [],
      graph: null,
      styles: [
        {
          backgroundColor: '#E094FF',
          borderColor: '#E094FF',
        },{
          backgroundColor: '#FFEC93',
          borderColor: '#FFEC93',
        },{
          backgroundColor: '#FF487A',
          borderColor: '#FF487A ',
        },{
          backgroundColor: '#D5F0FF',
          borderColor: '#D5F0FF',
        }
      ]
    };
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
                  tooltipFormat: 'DD T'
                },
                title: {
                  display: false,
                  text: 'Date'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Temperature'
                }
              }
            },
            plugins: {
              legend: {
                display: false,
              }
            }
          }
        };
        setTimeout(() => {
          this.graph = new Chart(
            this.$refs.graphCanvas,
            config
          );
        }, 1000);
      }else{
        // graph exista
        this.graph.data.datasets = this.graphData;
        this.graph.update('none');
      }
    }
  },

  async fetch() {
    setTimeout(() => {
      this.heading = "chart 01";

      this.data = [{
        sensorName: 'Pokój A',
        data: [
          { x: new Date('2021-07-26T16:00:00.000Z'), y: 35 },
          { x: new Date('2021-07-26T17:00:00.000Z'), y: 36 },
          { x: new Date('2021-07-26T18:00:00.000Z'), y: 33 },
          { x: new Date('2021-07-26T19:00:00.000Z'), y: 32 },
          { x: new Date('2021-07-26T20:00:00.000Z'), y: 30 }
        ]
      },{
        sensorName: 'Pokój B',
        data: [
          { x: new Date('2021-07-26T16:00:00.000Z'), y: 34 },
          { x: new Date('2021-07-26T17:00:00.000Z'), y: 34 },
          { x: new Date('2021-07-26T18:00:00.000Z'), y: 32 },
          { x: new Date('2021-07-26T19:00:00.000Z'), y: 30 },
          { x: new Date('2021-07-26T20:00:00.000Z'), y: 27 },
        ]
      },{
        sensorName: 'Pokój B',
        data: [
          { x: new Date('2021-07-26T16:00:00.000Z'), y: 24 },
          { x: new Date('2021-07-26T17:00:00.000Z'), y: 24 },
          { x: new Date('2021-07-26T18:00:00.000Z'), y: 22 },
          { x: new Date('2021-07-26T19:00:00.000Z'), y: 20 },
          { x: new Date('2021-07-26T20:00:00.000Z'), y: 17 },
        ]
      },
      {
        sensorName: 'Pokój B',
        data: [
          { x: new Date('2021-07-26T16:00:00.000Z'), y: 4 },
          { x: new Date('2021-07-26T17:00:00.000Z'), y: 23 },
          { x: new Date('2021-07-26T18:00:00.000Z'), y: 12 },
          { x: new Date('2021-07-26T19:00:00.000Z'), y: 22 },
          { x: new Date('2021-07-26T20:00:00.000Z'), y: 6 },
        ]
      }
      ];

      this.graphData = this.data.map((obj, i) => ({
        id: i, // todo: replace with id from server
        label: obj.sensorName,
        backgroundColor: this.styles[i % this.styles.length].backgroundColor,
        borderColor: this.styles[i % this.styles.length].borderColor,
        data: obj.data,
      }));


      this.updateGraph();

      setTimeout(() => this.$fetch(), 2000)

    }, 500);
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
  
    @include bp(max-square) {
      margin: 0.4rem 0.2rem 0;
    }
  }
}

</style>