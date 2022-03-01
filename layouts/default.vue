<template> 
  <div class="layout-root">
    <Header></Header>
    <Nuxt />
    <Footer></Footer>
    <div class="bg-gradient"></div>
    <div class="bg-img">
      <div class="container app-background-image-container"> 
        <img src="~assets/img/Background_v37_1_blurred_small.png" alt="background image">
        <img src="~assets/img/glowing_eyes8_small.png" alt="background eyes" class="eyes">
      </div>
    </div>
    <Fireflies />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Xanh+Mono&display=swap');
</style>

<style lang="scss" scoped>

.bg-img {
  position: fixed;
  z-index: -100;
  top:4rem;
  left:3rem;
  right:0; 
  user-select: none;  
  
  @include bp(max-square) {
      left:2rem;
  }

  @include bp(max-portrait) {
      left:1.8rem;
  }


  .eyes {
    opacity: 0%;
    animation: eye-glow 24s infinite;
  }
  @keyframes eye-glow {
    0% {
      opacity:0%;
    }
    42% {
      opacity:0%;
    }
    49% {
      opacity:40%;
    }
    53% {
      opacity:39%;
    }  
    62%{
      opacity:0%;
    } 
    100%{
      opacity:0%;
    }
  }


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

@mixin text-selection{
  color: $color-black;
  background: #af1c43; 
  text-shadow: 
    $color-secondary-dark 0 0 0.10rem, 
    $color-secondary-dark  0 0 0.15rem,
    transparentize( $color-secondary-dark, 0.8) 0 0 3rem;
}
::-moz-selection { 
  @include text-selection;
}
::selection { 
    @include text-selection;
}

html, body {
  margin: 0;
  padding: 0;
  line-height: $line-height;
}

html {
  font-family: 'Xanh Mono', monospace;
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

.settings-svg {
  fill: $color-primary;
  height: $text-larger;
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
// html { font-size: 32px !important; } 
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

a, a:visited {
  transition: $transition;
  text-decoration: none;
  color: #7a7397;
}

a:hover {
  color: #9e95c5;
}
</style>
