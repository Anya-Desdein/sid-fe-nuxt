<template>
  <div class="tile-header">
    <h2 :title="title"><slot /></h2>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  }
}
</script>

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
    padding: 1rem;
    margin: -1rem;
  }
</style>
