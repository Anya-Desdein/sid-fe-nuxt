<template> 
  <div class="layout-root">
    <Header></Header>
    <Nuxt />
    <Footer></Footer>
    <div class="bg-gradient"></div>
    <div class="bg-img">
      <div class="container"> 
        <img src="~assets/img/Background_v32_blurred.png" alt="background image">
        <img src="~assets/img/kokeshi_eyes4.png" alt="background eyes" class="eyes">
      </div>
    </div>
    <div class="bg-fireflies">
      <div v-for="(el, i) in elements" :key="i" :class="el"></div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    let numberArray = [
      [5, 'firefly-a'], 
      [22, 'firefly-b'], 
      [33, 'firefly-c'], 
      [41, 'firefly-d'], 
      [180, 'firefly-e']
    ];

    const elements = [];
    let i = 0;

    for(let [count, name] of numberArray) {
      for(let j = 0; j < count; j++) {
        elements.push(['firefly', name, 'firefly-' + (i++)])
      }
    }

    console.log("Total fireflies:", i);

    return {
      elements
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
  
  .eyes {
    opacity: 0%;
    animation: eye-glow 12s infinite;
    animation-delay: 3s;
  }
  @keyframes eye-glow {
    0% {
      opacity:0%;
    }
    56% {
      opacity:0%;
    }
    68% {
      opacity: 15%;
    }
    78% {
      opacity:73%;
    }
    81% {
      opacity:71%;
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
  background: #a35d4b;
  border-radius: 50%;
  width: 0.5em;
  height: 0.5em;
  position: fixed;
  transform: translate(-50%, -50%);
}

.firefly-a {
  opacity: 20%;
  animation: submove1 31s infinite;
  animation: move1 61s infinite;
}
@keyframes submove1{
  0% {
    margin: 0;
  }
  20%{
    margin-left: -0.2rem;
    margin-top: -0.1rem;
  }
  40%{
    margin-left: -0.1rem;
    margin-top: 0.2rem;
  }
  60%{
    margin-left: -0.3rem;
    margin-top: 0.2rem;
  }  
  80%{
    margin-left: 0.275rem;
    margin-top: -0.13rem;
  }  
  100%{
    margin: 0;
  }
}
@keyframes move1 {
  0% {
    transform: translate(-50%, -50%) translate(0, 0) scale(1.2);
  }
  25% {
    transform: translate(-50%, -50%) translate(-0.7rem, 0.8rem) scale(1.75);
    background: #862d3f;
  }
  50% {
    transform: translate(-50%, -50%) translate(-1rem, -0.4rem) scale(0.7);
  }
  90% {
    transform: translate(-50%, -50%) translate(0.2rem, 1rem) scale(1.4);
  }
  100% {
    transform: translate(-50%, -50%) translate(0, 0) scale(1.2);
  }
}


.firefly-b {
  opacity: 25%;
  animation: submove2 43s infinite;
  animation: move2 85s infinite;
}
@keyframes submove2{
  0% {
    margin: 0;
  }
  13%{
    margin-left: 0.1rem;
    margin-top: 0.3rem;
  }
  20%{
    margin-left: -0.4rem;
    margin-top: 0.2rem;
  }
  33%{
    margin-left: -0.2rem;
    margin-top: 0.7rem;
  }  
  49%{
    margin-left: -0.4rem;
    margin-top: 0.2rem;
  }
  59%{
    margin-left: -0.7rem;
    margin-top: -0.4rem;
  }  
  74%{
    margin-left: 0.3rem;
    margin-top: -0.2rem;
  }    
  100%{
    margin: 0;
  }
}
@keyframes move2 {
  0% {
    transform: translate(-50%, -50%) translate(0, 0) scale(0.9);
  }
  17% {
    transform: translate(-50%, -50%) translate(-0.7rem, 1rem) scale(1);
  }
  33% {
    transform: translate(-50%, -50%) translate(-1.2rem, -0.4rem) scale(0.65);
  }
  62% {
    transform: translate(-50%, -50%) translate(0.2rem, 1.2rem) scale(1.2);
    background: #862d3f;
  }
  100% {
    transform: translate(-50%, -50%) translate(0, 0) scale(0.9);
  }
}

.firefly-c {
  opacity: 30%;
  animation: submove3 8s infinite;
  animation: move3 5s infinite;
}
@keyframes submove3{
  0% {
    margin: 0;
  }
  20%{
    margin-left: 0.1rem;
    margin-top: 0.05rem;
  }
  40%{
    margin-left: 0.15rem;
    margin-top: -0.2rem;
  }
  60%{
    margin-left: -0.1rem;
    margin-top: -0.22rem;
    background: #862d3f;
  }  
  80%{
    margin-left: -0.08rem;
    margin-top: -0.2rem;
  }  
  100%{
    margin: 0;
  }
}
@keyframes move3 {
  0% {
    transform: translate(-50%, -50%) translate(0, 0) scale(0.4);
  }
  25% {
    transform: translate(-50%, -50%) translate(-0rem, 0rem) scale(0.3);
  }
  90% {
    transform: translate(-50%, -50%) translate(0rem, 0rem) scale(0.2);
  }
  100% {
    transform: translate(-50%, -50%) translate(0, 0) scale(0.4);
  }
}

.firefly-d {
  
  opacity: 40%;
  animation: submove4 6s infinite;
  animation: move4 11s infinite;
}
@keyframes submove4{
  0% {
    margin: 0;
  }
  20%{
    margin-left: -0.2rem;
    margin-top: -0.1rem;
  }
  40%{
    margin-left: 0.1rem;
    margin-top: 0.3rem;
  }
  60%{
    margin-left: -0.4rem;
    margin-top: -0.2rem;
  }  
  80%{
    margin-left: -0.13rem;
    margin-top: 0.08rem;
    background: #862d3f;
  }  
  100%{
    margin: 0;
  }
}
@keyframes move4 {
  0% {
    transform: translate(-50%, -50%) translate(0, 0) scale(0.38);
  }
  45% {
    transform: translate(-50%, -50%) translate(-1.2rem, -0.4rem) scale(0.43);
  }
  55% {
    transform: translate(-50%, -50%) translate(-0.7rem, 1rem) scale(0.34);
  }
  70% {
    transform: translate(-50%, -50%) translate(0.2rem, 1.2rem) scale(0.37);
  }
  100% {
    transform: translate(-50%, -50%) translate(0, 0) scale(0.38);
  }
}

.firefly-e {
  opacity: 50%;
  animation: submove5 3s infinite;
  animation: move5 7s infinite;
}
@keyframes submove5{
  0% {
    margin: 0;
  }
  20%{
    margin-left: 0.4rem;
    margin-top: -1rem;
  }
  40%{
    margin-left: -0.8rem;
    margin-top: -0.2rem;
  }
  60%{
    margin-left: 0.1rem;
    margin-top: 0.4rem;
  }  
  80%{
    margin-left: 0.5rem;
    margin-top: 0.7rem;
  }  
  100%{
    margin: 0;
  }
}
@keyframes move5 {
  0% {
    transform: translate(-50%, -50%) translate(0, 0) scale(0.15);
  }
  45% {
    transform: translate(-50%, -50%) translate(1.4rem, -0.8rem) scale(0.2);
  }
  55% {
    transform: translate(-50%, -50%) translate(0.7rem, 2rem) scale(0.23);
  }
  75% {
    transform: translate(-50%, -50%) translate(-0.3rem, 1rem) scale(0.23);
  }
  100% {
    transform: translate(-50%, -50%) translate(0, 0) scale(0.15);
  }
}


$i: 281;
@for $i from 0 through $i { 
  .firefly-#{$i} { 
    top: (random(95) + 5) * 1vh;
    left: (random(105)-2.5) * 1vw; 
    animation-delay: -1s + ($i % 3);
    animation-duration: 10s + ($i % 8), 2s + ($i % 3);
  } 
}

</style>
