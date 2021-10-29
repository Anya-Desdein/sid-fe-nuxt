<template>
  <header>
    <div class="content">
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
    </div>
    <div class="ghost"></div>
  </header>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">

img {
  height: 2.5rem;
  margin-top: 0.265rem;
  margin-right: 1.625rem;
  display: block;
}

header .content {
  background-color: $color-black;
  font-size: 1.875rem;
  color: $color-nav-inactive; 
  border-bottom: $border;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

header .ghost {
  height: 4rem;
  position: relative;

  &:after {
    content: '';
    position: fixed;
    z-index: -10;
    top: 3.875rem;
    height: 2rem;
    width: 100%;
    background: linear-gradient(
      to bottom, 
      $color-nav-bar-shadow, 
      $color-nav-bar-shadow 4%, 
      transparentize($color-nav-bar-shadow, 0.7) 45%, 
      transparent
    );
  }
}

header .nuxt-link-exact-active
{
  color: $color-primary !important;
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
  padding: 0.875rem 0.875rem 0.8125rem;
  margin-left: 2rem;

  transition: color $transition;

  &, &:visited, &:hover, &:focus {
    text-decoration: none;
    color: inherit;
  }
}

</style>