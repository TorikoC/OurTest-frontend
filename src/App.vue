<template>
  <div id="app">
    <header>
      <nav id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/Polygon">Polygon</router-link>
        <router-link to="/Login">Login</router-link>
      </nav>
    </header>
    <router-view/>
    <footer>
      @copyright
    </footer>
  </div>
</template>

<script>
export default {

};
</script>

<style>
  #app {
    position: relative;
    width: 900px;
    min-height: 500px;
    margin: 0 auto;
  }
  #nav {
    border: 1px solid black;
    border-radius: 2px;
  }
</style>
