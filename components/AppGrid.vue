<template>
 <div class="app-grid">
   <slot />
 </div>
</template>

<style lang="scss" scoped>
.app-grid {
  display: grid;
  gap: 3rem 1rem;
  // change gap in sqare and mobile
  grid-auto-flow: row;
  grid-auto-rows: 1fr;
  grid-auto-columns: minmax(0, 1fr);
  grid-template-areas:   
    "c1 c2 c3 e c4"   
    "c5 c6 c7 e c8";

  @include bp(max-square) {
    gap: 4rem 1rem;
    grid-template-areas:   
      "c1 c2 c3"   
      "c4  e c5"
      "c6 c7 c8";
  }

  @include bp(max-portrait) {
    grid-template-areas:   
      "e  c2 f "   
      "c1 c2 c3"   
      "c1  g c3"
      "c4  g c5"
      "c4  g c5"
      "c6  g c7"
      "c6 c8 c7"
      "h  c8 i";
  }

  & > *:nth-child(1) { grid-area: c1; }
  & > *:nth-child(2) { grid-area: c2; }
  & > *:nth-child(3) { grid-area: c3; }
  & > *:nth-child(4) { grid-area: c4; }
  & > *:nth-child(5) { grid-area: c5; }
  & > *:nth-child(6) { grid-area: c6; }
  & > *:nth-child(7) { grid-area: c7; }
  & > *:nth-child(8) { grid-area: c8; }

}
</style>