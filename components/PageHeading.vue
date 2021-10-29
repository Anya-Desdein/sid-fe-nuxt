<template>
 <div class="page-heading">
    <div class="container" v-if="title">
      <h1 class="page-heading__title">{{title}}</h1>
    </div>
    <div class="page-heading__info-bar">
      <div class="container">
        <slot />   
      </div>
    </div>
 </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>

.page-heading {
  display:flex;
  flex-direction: column-reverse;

  &__title {
    width: 100% * 0.2 * 2;
    border-bottom: $border;
    text-align: center;
    padding-top: 1.5rem;
    padding-bottom: 0.3rem;
    margin-bottom: 1.6rem;
  }

  &__info-bar {
    text-align: right;
    font-size: $text-larger;
    color: $color-primary;
    padding: 0.8rem 0;
    width: 100%;
    border-bottom: $border;
    min-height: 3.26rem;
  }
}



</style>