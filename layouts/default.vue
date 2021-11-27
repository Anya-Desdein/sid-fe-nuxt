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
      <div v-for="(el, i) in elements" :key="i" :class="el" ><div class="firefly-inner"></div></div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    let presets = [
      [
        [3, 'firefly-a'], 
        [6, 'firefly-b'], 
        [9, 'firefly-c'], 
        [15, 'firefly-d'], 
        [12, 'firefly-e'],
        [33, 'firefly-h'],
        [61, 'firefly-i'],
      ],
      [
        [5, 'firefly-f'], 
        [22, 'firefly-g'], 
        [33, 'firefly-h'], 
        [41, 'firefly-i'],
      ]
    ];

    const numberArray = presets[0];

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

@mixin fireflyAnimation($frameTime) {
  &:before, &:after, .firefly-inner:before, .firefly-inner:after {
    animation: fireflyFrameAnimation (4*$frameTime) infinite;
    animation-delay: -3 * $frameTime;
  }
  &:after {
    animation-delay: -2 * $frameTime;
  }
  .firefly-inner:before {
    animation-delay: -1 * $frameTime;
  }
  .firefly-inner:after {
    animation-delay: 0s;
  }
}

.firefly {
  opacity: 35%;
  position: fixed;
  z-index: -300;
}

.firefly-a,
.firefly-b,
.firefly-c,
.firefly-d,
.firefly-e {
  @include fireflyAnimation(0.4s);
  &:before, &:after, .firefly-inner:before, .firefly-inner:after {
    position: absolute;
    content: '';
    display: block;
    width: 0.5em;
    height: 0.5em;
    transform: translate(-50%, -50%);
    background-size: contain;
    background-repeat: no-repeat;
    animation-timing-function: cubic-bezier(1, 0.08, 0, 0.92);
  }
  &:before {
    background-image: url("~assets/img/firefly21.svg");
  }
  &:after {
    background-image: url("~assets/img/firefly22.svg");
  }
  .firefly-inner:before {
    background-image: url("~assets/img/firefly24.svg");
  }
  .firefly-inner:after {
    background-image: url("~assets/img/firefly23.svg");
  }
}

.firefly-f,
.firefly-g,
.firefly-h,
.firefly-i {
  // filter: hue-rotate(-16.41deg);
  // filter: hue-rotate(12.27deg) saturate(0.761);
  border-radius: 50%;
  display: block;
  width: 0.5em;
  height: 0.5em;
  transform: translate(-50%, -50%);
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("~assets/img/firefly27_red.svg");
  animation-timing-function: cubic-bezier(1, 0.08, 0, 0.92);
  filter: hue-rotate(12.27deg) saturate(0.761);
}

@keyframes fireflyFrameAnimation {
  0% {
    opacity: 0;
  }
  27% {
    opacity: 1;
  }
  54% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

//butterflies
.firefly-a {
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
    transform: rotate(40deg);
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
    transform: rotate(0deg) translate(-50%, -50%) translate(0, 0) scale(3.8);
    opacity: 40%;
    filter: hue-rotate(0deg);
  }
  35% {
    transform: rotate(-100deg) translate(-50%, -50%) translate(-0.6rem, 0.4rem) scale(3.2);
  }
  50% {
    transform: rotate(-160deg) translate(-50%, -50%) translate(-1rem, -0.4rem) scale(2.6);
    opacity:25%;
  }
  70% {
    transform: rotate(80deg) translate(-50%, -50%) translate(0.2rem, 1rem) scale(3.2);
    filter: hue-rotate(20deg);
  }
  100% {
    transform: rotate(0deg) translate(-50%, -50%) translate(0, 0) scale(3.8);
    opacity: 40%;
    filter: hue-rotate(0deg);
  }
}


.firefly-b {
  animation: submove2 43s infinite;
  animation: move2 720s infinite;
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
    transform: rotate(0deg) translate(-50%, -50%) translate(0, 0) scale(2.5);
    opacity: 45%;
    filter: hue-rotate(10deg);
  }
  17% {
    transform: rotate(-80deg) translate(-50%, -50%) translate(-0.4rem, 0.6rem) scale(2);
    opacity:55%;
    filter: hue-rotate(25deg);
  }
  33% {
    transform: rotate(60deg) translate(-50%, -50%) translate(0.6rem, -1rem) scale(2.1);
    opacity: 45%;
  }
  62% {
    transform: rotate(40deg) translate(-50%, -50%) translate(-0.3rem, -0.3rem) scale(2.9);
    opacity: 5%;
  }
  100% {
    transform: rotate(0deg) translate(-50%, -50%) translate(0, 0) scale(2.5);
    opacity: 45%;
    filter: hue-rotate(10deg);
  }
}

.firefly-c {
  animation: submove3 8s infinite;
  animation: move3 15s infinite;
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
    transform: rotate(120deg) translate(-50%, -50%) translate(0, 0) scale(1.9);
    opacity: 30%;
    filter: hue-rotate(5deg);
  }
  25% {
    transform: rotate(60deg) translate(-50%, -50%) translate(-1.6rem, -2.2rem) scale(2.8);
    opacity: 25%;
    filter: hue-rotate(15deg);
  }
  40% {
    transform: rotate(80deg) translate(-50%, -50%) translate(-2rem, -1.2rem) scale(2.2);
    opacity: 50%;
    filter: hue-rotate(15deg);
  }
  100% {
    transform: rotate(120deg) translate(-50%, -50%) translate(0, 0) scale(1.9);
    opacity: 30%;
    filter: hue-rotate(5deg);
  }
}

.firefly-d {
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
  }  
  100%{
    margin: 0;
  }
}
@keyframes move4 {
  0% {
    transform: rotate(-70deg) translate(-50%, -50%) translate(0, 0) scale(1.6);
    opacity: 35%;
    filter: hue-rotate(10deg);
  }
  45% {
    transform: translate(-50%, -50%) translate(1.2rem, 0.4rem) scale(2);
    opacity: 70%;
    filter: hue-rotate(25deg);
  }
  55% {
    transform: rotate(-130deg) translate(-50%, -50%) translate(-1rem, 0.3rem) scale(1.4);
    filter: hue-rotate(40deg);
  }
  70% {
    transform: rotate(-40deg) translate(-50%, -50%) translate(0.2rem, 1rem) scale(2.2);
  }
  100% {
    transform: rotate(-70deg) translate(-50%, -50%) translate(0, 0) scale(1.6);
     opacity: 35%;
    filter: hue-rotate(10deg);
  }
}

.firefly-e {
  animation: submove5 3s infinite;
  animation: move5 1200s infinite;
}
.firefly-e:nth-child(2) {
  animation: move6 360s infinite;
}
@keyframes submove5{
  0% {
    margin: 0;
  }
  20%{
    margin-left: 0.2rem;
    margin-top: -0.3rem;
  }
  40%{
    margin-left: -0.2rem;
    margin-top: -0.2rem;
  }
  60%{
    margin-left: 0.1rem;
    margin-top: 0.2rem;
  }  
  80%{
    margin-left: 0.3rem;
    margin-top: 0.1rem;
  }  
  100%{
    margin: 0;
  }
}
@keyframes move5 {
  0% {
    transform: rotate(-180deg) translate(-50%, -50%) translate(1.4rem, 6rem) scale(1.5);
    opacity: 0%;
    filter: hue-rotate(10deg);
  }
  2% {

    opacity: 5%;
  }
  45% {
    transform: rotate(-170deg) translate(-50%, -50%) translate(2rem, 4rem) scale(1.5);
    opacity: 40%;
    filter: hue-rotate(10deg);
  }
  60% {
    transform: rotate(-180deg)  translate(-50%, -50%) translate(0rem, 0rem) scale(1.2);
    opacity: 50%;
  }
  75% {
    transform: rotate(-90deg) translate(-50%, -50%) translate(-2rem, -1rem) scale(1.6);
    opacity: 40%;
    filter: hue-rotate(30deg);
  }
  95% {
    transform: rotate(-120deg) translate(-50%, -50%) translate(-2.5rem, -1rem) scale(1.3);
    opacity: 5%;
  }
  100% {
    transform: rotate(-180deg) translate(-50%, -50%) translate(-3rem, 1.2rem) scale(0.6);
    opacity: 0%;
    filter: hue-rotate(10deg);
  }
}
@keyframes move6 {
  0% {
    transform: rotate(-240deg) translate(-50%, -50%) translate(0rem, 0.3rem) scale(0.75);
    opacity: 30%;
    filter: hue-rotate(10deg);
  }
  50% {
    transform: rotate(-10deg) translate(-50%, -50%) translate(0.2rem, 0.4rem) scale(0.4);
    opacity: 50%;
    filter: hue-rotate(30deg);
  }
  100% {
    transform: rotate(-240deg) translate(-50%, -50%) translate(0rem, 0.3rem) scale(0.75);
    opacity: 30%;
    filter: hue-rotate(10deg);
  }
}

// fireflies
.firefly-f {
  opacity: 20%;
  animation: submove6 31s infinite;
  animation: move6 61s infinite;
}
@keyframes submove6{
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
@keyframes move6 {
  0% {
    transform: translate(-50%, -50%) translate(0, 0) scale(1.2);
  }
  25% {
    transform: translate(-50%, -50%) translate(-0.7rem, 0.8rem) scale(1.75);
    filter: hue-rotate(-16.41deg);
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
.firefly-g {
  opacity: 25%;
  animation: submove7 43s infinite;
  animation: move7 85s infinite;
}
@keyframes submove7{
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
@keyframes move7{
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
    filter: hue-rotate(-16.41deg);
  }
  100% {
    transform: translate(-50%, -50%) translate(0, 0) scale(0.9);
  }
}
.firefly-h {
  opacity: 30%;
  animation: submove8 8s infinite;
  animation: move8 8s infinite;
}
@keyframes submove8{
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
    filter: hue-rotate(-16.41deg);
  }  
  80%{
    margin-left: -0.08rem;
    margin-top: -0.2rem;
  }  
  100%{
    margin: 0;
  }
}
@keyframes move8{
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
.firefly-i {
  opacity: 40%;
  animation: submove9 6s infinite;
  animation: move9 11s infinite;
}
@keyframes submove9{
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
    filter: hue-rotate(-16.41deg);
  }  
  100%{
    margin: 0;
  }
}
@keyframes move9{
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



//iterate through background insects
// $fireflyCount: 101;
$fireflyCount: 139;
@for $i from 0 through $fireflyCount { 
  .firefly-#{$i} { 
    top: (random(95) + 5) * 1vh;
    left: (random(105)-2.5) * 1vw; 
    animation-delay: -20s + ($i % 8) + ($i % 8);
    animation-duration: 10s + ($i % 8), 2s + ($i % 3);
  } 
}


@include bp(max-square) {
  @for $j from 0 through floor($fireflyCount * 0.333333334) {
    $i: $j * 3;
    .firefly-#{$i} { 
      display: none;
    } 
  }
}

</style>
