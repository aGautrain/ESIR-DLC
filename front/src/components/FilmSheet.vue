<template>
  <div class="film-sheet-container">
    <h4>{{ title }}</h4>
    <template v-if="posterImage">
      <img class="film-sheet--poster" v-bind:src="posterImage" alt="Movie thumbnail">
    </template>
    <p class="film-sheet--description">{{ overview }}</p>
    <div class="genres-badges">
      <span v-for="genre in filmotron_genres" v-bind:key="id + '_' + genre" class="badge badge-light">{{genre}}</span>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
declare var apiPosterEndpoint: string;
declare var apiBigPosterEndpoint: string;

export default Vue.extend({
  name: "FilmSheet",
  // props inspired from Firebase data structure
  props: {
    id: String,
    adult: Boolean,
    backdrop_path: String,
    genre_ids: Array,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    release_date: String,
    title: String,
    video: Boolean,
    vote_average: Number,
    vote_count: Number,
    filmotron_genres: Array
  },
  computed: {
    posterImage: function(): string {
      return apiBigPosterEndpoint + this.backdrop_path;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.film-sheet-container {
  background-color: white;
  border-left: solid lightgray 2px;
  z-index: 5;

  .film-sheet--poster {
    width: 100%;
    margin: 10px 0px;
  }

  .film-sheet--description {
    font-size: 70%;
    padding: 20px;
    text-align: justify;
  }
}
</style>
