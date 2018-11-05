<template>
  <div id="app">
    <h1>Filmotron3000</h1>
    <SearchBar v-on:filter-request="logEvent"/>
    <QueryResult />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import QueryResult from "./components/QueryResult.vue";
import SearchBar from "./components/SearchBar.vue";

export default Vue.extend({
  name: "app",
  components: {
    QueryResult,
    SearchBar
  },
  methods: {
    logEvent: function(e) {
      console.log(e);
    }
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

  h1 {
    text-align: left;
    margin-left: 100px;
    padding: 30px;
  }

  form {
    margin-bottom: 30px;
  }
}
</style>
