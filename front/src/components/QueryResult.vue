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
import { Movie } from "../interfaces/movie.interface";
declare var db: any; // declaring db as a global variable (TS specific)

export default Vue.extend({
  name: "QueryResult",
  components: {
    FilmThumbnail
  },
  data: function(): {
    processingQuery: boolean;
    query: string;
    resultsFound: Movie[];
    resultsShown: Movie[];
  } {
    return {
      processingQuery: false,
      query: "", // Simple string for now, must match a film title
      resultsFound: [],
      resultsShown: []
    };
  },
  methods: {
    fetchLatestMovies: function(amount: number): Promise<any> {
      console.log("fetching movies");
      const latestMovies = db.collection("movies").limit(amount);

      return latestMovies
        .get()
        .then((querySnapshot: any) => {
          const movies: Movie[] = [];

          querySnapshot.forEach(function(doc: any) {
            console.log(doc.id, " => ", doc.data());
            movies.push(doc.data().film);
          });

          console.log(movies);
          return movies;
        })
        .catch((err: any) => {
          console.error("Fetching latest movies ", err);
          return [];
        });
    },
    queryDatabase: function(film: string) {
      this.query = film;
      this.processingQuery = true;
      console.log("query ...");
    }
  },
  created: function() {
    console.log("Component QueryResult instanciated !");
    this.fetchLatestMovies(20).then((movies: Movie[]) => {
      this.resultsFound = movies;
      this.resultsShown = movies;
    });
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
