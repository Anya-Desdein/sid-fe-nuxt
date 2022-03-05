<template>
 <div class="page-heading" :class="{'page-heading--title': title, 'page-heading--top-line': topLine, 'page-heading--no-info-bar': noInfoBar}">
    <div class="container" v-if="title" style="position:relative">
      <h1 class="page-heading__title">
        <span class="back-icon-container">
          <slot name="back-icon"/>
        </span>
        {{title}}
      </h1>
    </div>
    <div class="page-heading__info-bar">
      <div class="container">
        <div class="page-heading__content">
          <slot />
          <template v-if="!noInfoBar && !noIcons">
            <span>
              <img src="~assets/img/butterfly_icon.svg" alt="Butterfly Animation" title="Butterfly Animation">
            </span>
            <span>
              <img src="~assets/img/firefly_icon.svg" alt="Firefly Animation" title="Firefly Animation">
            </span>
            <span>
              <img src="~assets/img/null_icon.svg" alt="Disable Animation" title="Disable Animation">
            </span>
          </template>
        </div>
      </div>
    </div>
 </div>
</template>

<script>
export default {
  props: {
    title: String,
    noInfoBar: Boolean,
    noIcons: Boolean,
    topLine: Boolean,
  }
}
</script>

<style lang="scss">
.page-heading__content {
  > span {
    display: block;
    height: $text-large;
    width: $text-large;
    cursor: pointer;
    margin-left: 0.3rem;
    line-height: 1;
    transition: filter $transition;
  }

  > span, a {
    &:hover {
      filter: brightness(1.2) contrast(1.1);
    }
  }
}

.back-icon {
  position: absolute; 
  left:0;
  width:$text-huge;
  height:$text-huge;
  top:50%;
  transform: translateY(-50%);
}

@include bp(min-landscape) { 
  .back-icon {
    position: relative;
    top: 0.8rem;
      img {
        height: 2.1rem * 0.85;
        width: 2.1rem * 0.85;
        float: left;
      }
    }
  }


.page-heading__content {
  > a {
    display: block;
    height: $text-large;
    width: $text-large;
    line-height: 1;
  }
}

</style>

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
  
  &__content {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &--top-line {
    .page-heading__info-bar {
      border-top: $border;
      margin-top: 2.5rem;
    }
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