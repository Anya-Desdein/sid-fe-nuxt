<template>
 <div class="page-heading" :class="{'page-heading--title': title, 'page-heading--no-info-bar': noInfoBar}">
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
    title: String,
    noInfoBar: Boolean
  }
}
</script>

<style lang="scss" scoped>

.page-heading {
  display:flex;
  flex-direction: column-reverse;

  &__title { 
    margin-top: -1rem;
    border-bottom: $border;
  }

  &__info-bar {
    text-align: right;
    font-size: $text-larger;
    color: $color-primary;
    padding: 1rem 0 0.65rem;
    width: 100%;
    border-bottom: $border;
    min-height: (1rem + 0.65rem) + $text-larger * $line-height;
    margin-bottom: 2.5rem;
  }
}

@include bp(max-square) {
  .page-heading {
    flex-direction: column;
    &__info-bar {
      text-align: center;
    }

    &--title {
      h1 {
        margin-bottom: 0;
      }
      .page-heading__title {
        border-bottom: none;
        text-align: center;
        padding: 0.8rem 0 0.65rem;
        width: 100%;
        margin-top: 0;
        min-height: (0.8rem + 0.65rem) + $text-huge * $line-height;
      } 
      .page-heading__info-bar {
        border-bottom: #BEAC8F 0.0625rem solid;
        border-top: none;
        text-align: center;
        margin-bottom: 1.2rem; 
        padding-top: 0;
        min-height: (0 + 0.65rem) + $text-larger * $line-height;
      }
    }

    &--no-info-bar {
      .page-heading__info-bar {
        min-height: 0;
        padding: 0;
      }
    }
  }
}




</style>