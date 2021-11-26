<template> 
  <div class="layout-root">
    <Header></Header>
    <Nuxt />
    <Footer></Footer>
    <div class="bg-gradient"></div>
    <div class="bg-img">
      <div class="container"> 
        <img src="~assets/img/Background_v32_blurred.png" alt="background image">
      </div>
    </div>
    <div class="bg-fireflies">
      <div v-for="i in numberArray[0]" :key="i" :class="['firefly', 'firefly-a', 'firefly-' + i]"></div>
      <div v-for="i in numberArray[1]" :key="i+1000" :class="['firefly', 'firefly-b', 'firefly-' + (i+aCount)]"></div>
      <div v-for="i in numberArray[2]" :key="i+2000" :class="['firefly', 'firefly-c', 'firefly-' + (i+aCount + bCount)]"></div>
      <div v-for="i in numberArray[3]" :key="i+3000" :class="['firefly', 'firefly-d', 'firefly-' + (i+aCount + bCount + cCount)]"></div>
      <div v-for="i in numberArray[4]" :key="i+4000" :class="['firefly', 'firefly-d', 'firefly-' + (i+aCount + bCount + cCount + dCount)]"></div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    let numberArray = [5,17,43,51,111];
    return {
    numberArray
    };
  }
}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Xanh+Mono&display=swap');
</style>

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
    right: 100% * 0.2 * 1.61;
    width: 30rem;
    opacity: 0.54;

    @include bp(min-landscape) {
      margin-top: 1rem;
    }

    @include bp(max-square) {
      top: 9.8rem;
      right: 53%;
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
    transparentize(#5c001a, 0.74)
    );
  z-index: -101;
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
  line-height: $line-height;
}

html {
  font-family: 'Xanh Mono', monospace;
  // font-family: 'MingLiU_PLBBL_MIN2', monospace;
  color: $color-text;
  background-color: $color-background;
}

body {
  text-shadow: $color-background 0 0 0.10rem, 
    $color-background 0 0 0.15rem,
    transparentize($color-background, 0.4) 0 0 1rem,   
    transparentize($color-background, 0.3) 0 0 2.8rem,  
    transparentize($color-background, 0.8) 0 0 3rem;
  font-size: $text-normal;
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

.firefly {
  background: #BEAC8F;
  border-radius: 50%;
  opacity: 50%;
  width: 0.5em;
  height: 0.5em;
  position: fixed;
  
}

$i: 77;
@for $i from 1 through $i { 
  .firefly-#{$i} { 
    top: random(100) *1vh;
    left: random(100) *1vw;
  }
}
.firefly-a {
  animation-duration: 12s;
  animation-name: bop1;
  animation-iteration-count: infinite;
}
@keyframes bop1 {
  0% {
    font-size: 0.1rem;

  }

  100%{
    font-size: 0.1rem;
    margin-left: -6rem;
    margin-top: -3em;
  }
}


.firefly-b {

}
@keyframes bop2 {
}

.firefly-c {

}
@keyframes bop3 {
}

.firefly-d {

}
@keyframes bop4 {
}

</style>
