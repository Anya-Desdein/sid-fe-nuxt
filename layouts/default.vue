<template> 
  <div class="layout-root">
    <Header></Header>
    <Nuxt />
    <Footer></Footer>
    <div class="bg-gradient"></div>
    <div class="bg-img">
      <div class="container">
        <img src="~assets/img/post_resize_after_blur2.png" alt="background image">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>


.bg-img {
  position: fixed;
  z-index: -100;
  top:4rem;
  left:0;
  right:0;
  
  .container {
    position: relative;
  }

  img {
    display: block;
    position: absolute;
    transform: translateX(50%);
    right: 100% * 0.2 * 1.6;
    width: 30rem;
    opacity: 0.46;

    @include bp(min-landscape) {
      margin-top: 1rem;
    }

    @include bp(max-square) {
    top: 9.6rem;
    right: 54%;
    }
  }

}

.bg-gradient {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 25vh;
  
  background-image: linear-gradient( 
    to bottom,
    transparent, 
    transparentize(#6f1d29, 0.73)
    );
  z-index: -99;
}
</style>

<style lang="scss">

@font-face {
  font-family: 'MingLiU_PLBBL_MIN2';
  src: url('~assets/fonts/MingLiU_PLBBL_MIN2.ttf') format('truetype'),
       url('~assets/fonts/MingLiU_PLBBL_MIN2.woff') format('woff'),
       url('~assets/fonts/MingLiU_PLBBL_MIN2.woff2') format('woff2');
}

html, body {
  margin: 0;
  padding: 0;
  font-family: 'MingLiU_PLBBL_MIN2', monospace;
  line-height: 1.2;
}

html {
  color: $color-text;
  background-color: $color-background;
}

.layout-root {
  min-height: 100vh;
  position: relative;
}


/* 
  App scaling
    WL - font size width-limited,
    HL - font size height-limited,
*/

/* 9:16 WL (portrait) */ 
html { font-size: 2.962962963vw; }
.container { width: 29.75rem; }

/* 9:16 HL (portrait) */
@media (min-aspect-ratio: 9/16) {
  html { font-size: 1.666666667vh; }
}

/* 1:1 WL (square) */
@media (min-aspect-ratio: 3/4) {
  html { font-size: 2.5vw; }
  .container { width: 34.375rem; }
}

/* 1:1 HL (square) */
@media (min-aspect-ratio: 1/1) {
  html { font-size: 2.5vh; }
}

/* 16:9 WL (landscape) */
@media (min-aspect-ratio: 4/3) {
  html { font-size: 1.666666667vw; }
  .container { width: 55rem; }
}

/* 16:9 HL (landscape) */
@media (min-aspect-ratio: 16/9) {
  html { font-size: 2.962962963vh; }
}

/* Dev start */
/* html { font-size: 32px !important; } */
/* Dev end */

.container {
  margin-left: auto;
  margin-right: auto;
  /* margin-left: 3.25rem;
  margin-right: 2rem; */
}

h1,
h2,
h3,
h4,
h5 {
  color: $color-primary;
  margin-top: 0;
  margin-bottom: 0;
  font-weight: 400;
}

h1 {
  font-size: $text-huge;
  width: $heading-underscore-width;
  border-bottom: $border;
  text-align: center;
  padding-bottom: 0.3rem;
  margin-bottom: 1.6rem;
}

h2 {
  font-size: $text-large;
}

h3 {
  font-size: $text-large;
}

p {
  margin-top: 0;
  margin-bottom: 0;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}
</style>
