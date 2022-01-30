<template>
  <div class="grid-pages">
    <div v-for="(pageTiles, pageNumber) in pages" :key="pageNumber">
      <PageHeading class="grid-separator" :topLine="true" v-if="pageNumber !== 0" />
      <div class="container">
        <AppGrid>
          <div v-for="tile in pageTiles" :key="tile.id">
            <GenericTile :tileType="tile.tileType" :tileData="tile.tileData"></GenericTile>
          </div>
        </AppGrid>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    tiles: Array,
  },
  computed: {
    pages() {
      if(!this.tiles) return [];
      const maxPageSize = 8;
      const pages = [[]];
      this.tiles.forEach(t => {
        if(pages[pages.length-1].length >= maxPageSize) {
          pages.push([]);
        }
        pages[pages.length-1].push(t);
      });
      return pages;
    }
  }
}
</script>