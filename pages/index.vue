<template>
  <div>
    <PageHeading title="Obecne dane">Ostatnia aktualizacja: 18:20</PageHeading>
    <div class="container page-container"> 
      <!-- <breakpoint-test /> -->
      <AppGrid>
        <div><DataTile><h2>Temperatura rara rarara 1</h2><p>Pokój 1: 123</p><p>Pokój 2: 234</p></DataTile></div>
        <div><DataTile><h2>Temperatura 2</h2><p>Pokój 1: 123</p><p>Pokój 2: 234</p><p>Pokój 3: 55</p></DataTile></div>
        <div><DataTile><h2>Temperatura 3</h2><p>Pokój 1: 123</p><p>Pokój 2: 234</p><p>Pokój 3: 55</p></DataTile></div>
        <div><DataTile><h2>Temperatura 4</h2><p>Pokój 1: 123</p><p>Pokój 2: 234</p><p>Pokój 3: 55</p></DataTile></div>
        <div><DataTile><h2>Temperatura 5</h2><p>Pokój 1: 123</p><p>Pokój 2: 234</p><p>Pokój 3: 55</p></DataTile></div>
        <div><DataTile><h2>Temperatura 6</h2><p>Pokój 1: 123</p><p>Pokój 2: 234</p><p>Pokój 3: 55</p></DataTile></div>
        <div><DataTile><h2>Temperatura 7</h2><p>Pokój 1: 123</p><p>Pokój 2: 234</p><p>Pokój 3: 55</p></DataTile></div>
        <div><DataTile><h2>Temperatura 8</h2><p>Pokój 1: 123</p><p>Pokój 2: 234</p><p>Pokój 3: 55</p></DataTile></div>
      </AppGrid>


    </div>
  </div>
</template>

<script>
import BreakpointTest from '../components/BreakpointTest.vue';
import TileList from '../components/TileList.vue';
export default {
  components: { TileList, BreakpointTest },
  data() {
    return {
    };
  },
  methods: {
  }
}
</script>
