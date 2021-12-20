/*  nic nie robi */

<template>
 <div class="dynamic-tile">
   <h2 v-if="heading">{{heading}}</h2>
   <div class="dynamic-tile__lines" v-if="lines && lines.length">
     <p v-for="line in lines" :key="line.id">{{line.label}}: {{line.value}}</p>
   </div>
 </div>
</template>

<script>
export default {
  props: {
    heading: String,
    lines: Array,
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    margin-bottom: 0.475rem;
  }
  p, h2 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  p {
    margin-left: 0.71rem;
  }
</style>
