<template>
  <header>
    <div class="container">
      <ul>
        <li>
          <n-link to="/" class="icon">
           <img src="~/assets/img/logo9_3_1.svg" alt="icon">
          </n-link>
        </li>
        <li>
          <n-link to="/">Home</n-link>
        </li> 
        <li>
          <n-link to="/dashboard">Dashboard</n-link>
        </li>              
        <li>
          <n-link to="/tos">ToS</n-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">

img {
  height: 2.5rem;
  margin-top: 0.5rem;
  margin-right: 0.875rem;
}

header {
  background-color: #090017;
  font-size: 1.875rem;
}

ul {
  padding: 0;
  margin: 0;
  display: flex;
  list-style: none;
  flex-wrap: nowrap;
  align-items: center;
}

a:not(.icon) {
  display: inline-block;
  padding: 0.875rem;
  margin-left: 1.875rem;

  &, &:visited, &:hover, &:focus {
    text-decoration: none;
    color: inherit;
  }
}

</style>