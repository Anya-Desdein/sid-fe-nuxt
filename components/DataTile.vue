<template>
 <div class="data-tile">
   <slot />
 </div>
</template>

<style lang="scss" scoped>

  p, h2 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  p {
    margin-left: 5%;
  }

</style>
