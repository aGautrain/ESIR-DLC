<template>
  <div class="query-result">

    <div v-if="query !== ''">
      <p>Results for <i>{{ query }}</i></p>
      <!-- TODO: place FilmThumbnails matching query result -->
    </div>

    <div v-else>
      <div class="container">
        <div class="row">
          <FilmThumbnail v-for="movie in resultsShown" v-bind="movie" v-bind:key="movie.id" class="col-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FilmThumbnail from "./FilmThumbnail.vue";
import { FilmInterface } from "../interfaces/film.interface";
import { QueryBuilder } from "../libs/queries";
declare var db: any; // declaring db as a global variable (TS specific)

export default Vue.extend({
  name: "QueryResult",
  components: {
    FilmThumbnail
  },
  data: function(): {
    processingQuery: boolean;
    query: string;
    resultsFound: FilmInterface[];
    resultsShown: FilmInterface[];
  } {
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
  },
  created: function() {
    console.log("Component QueryResult instanciated !");
    QueryBuilder.getBestFilms(20).then((films: FilmInterface[]) => {
      this.resultsFound = films;
      this.resultsShown = films;
    });
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
