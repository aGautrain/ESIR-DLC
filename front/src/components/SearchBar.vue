<template>
  <form class="query-filter form-inline">
    <input v-model="filter" type="text" class="form-control" placeholder="Look for a specific film.." />
    <button v-on:click="filterResults" type="button" class="btn btn-primary">SEARCH</button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SearchBar",
  data: function(): {
    filter: string;
  } {
    return {
      filter: ""
    };
  },
  created: function() {
    console.log("Component SearchBar instanciated !");
  },
  methods: {
    filterResults: function(): void {
      this.$emit("filter-request", 3);
    }
  },
  created: function() {
    this.filterResults();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.query-filter {
  width: 50%;
  margin: auto;
  input {
    width: 80%;
    border-radius: 0px;
  }
  button {
    width: 20%;
    border-radius: 0px;
  }
}
</style>
