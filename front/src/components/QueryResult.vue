<template>
  <div class="query-result">

    <div v-if="query !== ''">
      <p>Displaying results for {{ query }} :</p>
      <!-- TODO: place FilmThumbnails matching query result -->
    </div>

    <div v-else>
      <input type="text" placeholder="Look for a specific film" />
      <p>Latest films added to base :</p>
      <!-- TODO: display some random FilmThumbnails -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "QueryResult",
  data: function() {
    return {
      processingQuery: false,
      query: "", // Simple string for now, must match a film title
      resultsFound: [],
      resultsShown: []
    };
  },
  methods: {
    queryDatabase: function(film: string) {
      this.query = film;
      this.processingQuery = true;
      console.log("query ...");
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
