/*  nic nie robi */

<template>
  <Tile>
    <h2>Nazwa urządzenia - nazwa pokoju</h2>

    sdsadssa
    <button-on-off title="asd" :state="tileState" @click="tileState = !tileState"></button-on-off>
    <div class="state">
      Stan: 
      <span> {{ tileState ? 'Włączony' : 'Wyłączony' }} </span>
    </div>
  </Tile>
</template>

<script>
export default {
   data() {
    return {
      tileState: false, 
    };
  }, 
}
</script>

<style lang="scss" scoped>
</style>