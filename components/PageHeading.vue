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
    margin-top: -1rem;
  }

  &__info-bar {
    text-align: right;
    font-size: $text-larger;
    color: $color-primary;
    padding: 0.8rem 0;
    width: 100%;
    border-bottom: $border;
    min-height: 3.26rem;
    margin-bottom: 2.5rem;
  }
}

 @include bp(max-square) {
   .page-heading {
     flex-direction: column;
   
    &__title {
      text-align: center;
      padding: 0.8rem 0;
      width: 100%;
      margin-top: 0;
      min-height: 3.26rem;
      border-bottom: none;
    } 

    h1 {
      margin-bottom: 0;
    }

    &__info-bar {
    border-top: #BEAC8F 0.0625rem solid;
    border-bottom: none;
    margin-bottom: 1.6rem; 
    //  policzyć ile ma mieć margin-bottom
    }

  }

 }



</style>