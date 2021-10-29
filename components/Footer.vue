<template>
  <footer>
    <div class="content">
      <div class="container"> 
        Wanda Zaparta
      </div>     
    </div>
    <div class="ghost"></div>
  </footer>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.content {
  text-align: right;
  border-top: $border;
  font-size: $text-large;
  color: $color-primary;
  padding: 0.8rem 0;
  margin-top: 0.8rem;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.ghost {
  height: 4rem;
}

</style>