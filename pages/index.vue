<template>
  <div>
    <PageHeading title="Obecne dane">Ostatnia aktualizacja: 18:20</PageHeading>
    <div class="container page-container"> 
      <NuxtLink to="/HomeConfig" class="config-button">Config</NuxtLink>
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
    const tiles = JSON.parse(window.localStorage.getItem("__home-tiles") || '[]') || [];
    return {
      tiles
    };
  },
  methods: {



  }
}
</script>
