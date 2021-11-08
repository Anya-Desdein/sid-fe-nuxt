<template>
  <div>
    <PageHeading>Ostatnia aktualizacja: 18:20</PageHeading>
    <div class="container page-container">
      <AppGrid>
        <div><DataTile><h2>Temperatura rara rarara 1</h2><p>Pokój 1: 123</p><p>Pokój 2: 234</p></DataTile></div>
        <div><h2>Temperatura 2</h2><p>Pokój 1: 123</p><p>Pokój 2: 234</p><p>Pokój 3: 55</p></div>
        <div><h2>Temperatura 3</h2><p>Pokój 1: 123</p><p>Pokój 2: 234</p><p>Pokój 3: 55</p></div>
        <div><h2>Temperatura 4</h2><p>Pokój 1: 123</p><p>Pokój 2: 234</p><p>Pokój 3: 55</p></div>
        <div><h2>Temperatura 5</h2><p>Pokój 1: 123</p><p>Pokój 2: 234</p><p>Pokój 3: 55</p></div>
        <div><h2>Temperatura 6</h2><p>Pokój 1: 123</p><p>Pokój 2: 234</p><p>Pokój 3: 55</p></div>
        <div><h2>Temperatura 7</h2><p>Pokój 1: 123</p><p>Pokój 2: 234</p><p>Pokój 3: 55</p></div>
        <div><h2>Temperatura 8</h2><p>Pokój 1: 123</p><p>Pokój 2: 234</p><p>Pokój 3: 55</p></div>
      </AppGrid>
      <!-- <tile-list>
      </tile-list> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  }
}
</script>

<style lang="scss">
.app-grid > div {
  h2 {
    margin-bottom: 0.475rem;
  }
  p {
    margin-left: 0.71rem;
  }
}
</style>