<template>
  <div>
    <PageHeading title="Obecne dane">
        <LastUpdated></LastUpdated>                             
        <NuxtLink to="/HomeEditor" class="config-button" title="Home-Editor">
          <img src="~assets/img/cog_icon.svg" alt="Home Editor">
        </NuxtLink>                          
    </PageHeading>
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
    const tiles = JSON.parse(window.localStorage.getItem("__home-tiles") || '[]') || [];
    return {
      tiles
    };
  },
  methods: {



  }
}
</script>

<style lang="scss" scoped>

</style>