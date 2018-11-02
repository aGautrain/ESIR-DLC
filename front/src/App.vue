<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>

    <FilmThumbnail />

    <br/>
    <h1>RESULT</h1>
    <QueryResult />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import FilmThumbnail from "./components/FilmThumbnail.vue";
import QueryResult from "./components/QueryResult.vue";

export default Vue.extend({
  name: "app",
  components: {
    HelloWorld,
    FilmThumbnail,
    QueryResult
  }
});
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
