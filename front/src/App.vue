<template>
  <div id="app">
    <h1>Filmotron3000</h1>
    <SearchBar v-on:filter-name-request="fetchFilms" v-on:filter-genre-request="filterGenres"/>
    <QueryResult v-bind:results="filmsExposed" />

    <Paginator v-if="mustPaginate" />

    <div v-if="processing" class="loading">
      <i class="fas fa-spinner fa-spin fa-2x"></i>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import QueryResult from "./components/QueryResult.vue";
import SearchBar from "./components/SearchBar.vue";
import Paginator from "./components/Paginator.vue";

import { FilmInterface } from "./interfaces/film.interface";
import { QueryBuilder } from "./libs/queries";
import { GenreFinder } from "./libs/genres";

export default Vue.extend({
  name: "app",
  data: function(): {
    films: FilmInterface[];
    filmsExposed: FilmInterface[];
    processing: boolean;
  } {
    return {
      films: [],
      filmsExposed: [],
      processing: false
    };
  },
  computed: {
    mustPaginate: function() {
      return this.films.length > 10; // TODO store pagination variables in a separate file
    }
  },
  components: {
    QueryResult,
    SearchBar,
    Paginator
  },
  methods: {
    fetchFilms: function(query: string): void {
      this.processing = true;
      if (query) {
        // TODO: Regex on query (SAFETY)
        QueryBuilder.getFilm(query).then((films: FilmInterface[]) => {
          for (let i: number = 0; i < films.length; i++) {
            films[i].filmotron_genres = GenreFinder.getGenresFromIds(
              films[i].genre_ids
            );
          }
          this.films = films;
          this.filmsExposed = films;
          this.processing = false;
        });
      } else {
        QueryBuilder.getBestFilms(18).then((films: FilmInterface[]) => {
          for (let i: number = 0; i < films.length; i++) {
            films[i].filmotron_genres = GenreFinder.getGenresFromIds(
              films[i].genre_ids
            );
          }
          this.films = films;
          this.filmsExposed = films;
          this.processing = false;
        });
      }
    },
    filterGenres: function(genres: number[]): void {
      if (genres.length > 0) {
        // Showing only films matching given genre
        this.filmsExposed = this.films.filter((film: FilmInterface) => {
          let isShown: boolean = false;
          for (let genre of film.genre_ids) {
            isShown = isShown || genres.indexOf(genre) > -1;
          }
          return isShown;
        });
      } else {
        // Showing all films
        this.filmsExposed = this.films;
      }
    }
  },
  created: function() {
    this.fetchFilms("");
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

  .loading {
    position: fixed;
    bottom: 10px;
    right: 20px;
  }
}
</style>
