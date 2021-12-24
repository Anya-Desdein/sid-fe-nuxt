<template>
  <div class="chart-tile">
    <TileHeading>{{heading}}</TileHeading>
    <canvas ref="graphCanvas"></canvas>
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
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 60)',
        },{
          backgroundColor: 'rgb(155, 99, 255)',
          borderColor: 'rgb(155, 99, 120)',
        },{
          backgroundColor: 'rgb(255, 55, 255)',
          borderColor: 'rgb(255, 55, 120)',
        },{
          backgroundColor: 'rgb(64, 255, 132)',
          borderColor: 'rgb(64, 255, 80)',
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
                  display: true,
                  text: 'Date'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Temperature'
                }
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
      }];

      this.graphData = this.data.map((obj, i) => ({
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
</style>