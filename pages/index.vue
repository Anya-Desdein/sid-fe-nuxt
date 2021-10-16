<template>
  <div>
    <Header></Header>
    <breakpoint-test />
    <Footer></Footer>
  </div>
</template>

<script>
import BreakpointTest from '../components/BreakpointTest.vue';
import TileList from '../components/TileList.vue';
export default {
  components: { TileList, BreakpointTest },
  data() {
    return {
    };
  },
  methods: {
  }
}
</script>

<style lang="scss">


</style>
