<template>
  <div class="tile-header">
    <h2><slot /></h2>
  </div>
</template>

<style lang="scss" scoped>
 .tile-header {
    margin-bottom: 0.9rem;
    padding: 0;
    text-align: left;
  }

  h2 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
