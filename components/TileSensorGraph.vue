<template>
  <Tile>
    <h2>Pokój A wykres</h2>
    <div>
      <canvas ref="graphCanvas"></canvas>
    </div>
  </Tile>
</template>

<script>

import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';

export default {
  mounted() {
    const data = {
      datasets: [{
        label: 'Pokój A',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [
          { x: new Date('2021-07-26T16:00:00.000Z'), y: 35 },
          { x: new Date('2021-07-26T17:00:00.000Z'), y: 36 },
          { x: new Date('2021-07-26T18:00:00.000Z'), y: 33 },
          { x: new Date('2021-07-26T19:00:00.000Z'), y: 32 },
          { x: new Date('2021-07-26T20:00:00.000Z'), y: 30 },
        ],
      },{
        label: 'Pokój B',
        backgroundColor: 'rgb(22, 99, 232)',
        borderColor: 'rgb(35, 99, 252)',
        data: [
          { x: new Date('2021-07-26T16:00:00.000Z'), y: 34 },
          { x: new Date('2021-07-26T17:00:00.000Z'), y: 34 },
          { x: new Date('2021-07-26T18:00:00.000Z'), y: 32 },
          { x: new Date('2021-07-26T19:00:00.000Z'), y: 30 },
          { x: new Date('2021-07-26T20:00:00.000Z'), y: 27 },
        ],
      }]
    };
    const config = {
      type: 'line',
      data,
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
      var myChart = new Chart(
        this.$refs.graphCanvas,
        config
      );
    }, 500);
  }
}
</script>

<style lang="scss" scoped>
ul {
  text-align: left;
}
</style>