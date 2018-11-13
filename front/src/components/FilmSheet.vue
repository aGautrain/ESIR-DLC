<template>
  <div class="film-sheet-container container">
    <div class="row">
      <div class="col-2">
        <img v-if="posterImage" class="film-sheet--poster" v-bind:src="posterImage" alt="Loading poster..." />
        <h4>{{ title }}</h4>
      </div>

      <div class="col-3">
        <template v-if="screenshotImage">
          <img class="film-sheet--screenshot" v-bind:src="screenshotImage" alt="Movie thumbnail" />
        </template>
      </div>

      <div class="col-7">
        <p class="film-sheet--description">{{ overview }}</p>
        <p class="film-sheet--parution">Sorti en salle le {{ releaseDate }}</p>

        <div class="genres-badges">
          <span v-for="genre in filmotron_genres" v-bind:key="id + '_' + genre" class="badge badge-light">{{genre}}</span>
        </div>
      </div>
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
    screenshotImage: function(): string {
      return apiBigPosterEndpoint + this.backdrop_path;
    },
    posterImage: function(): string {
      return apiPosterEndpoint + this.poster_path;
    },
    releaseDate: function(): string {
      return (
        this.release_date.substring(8, 10) +
        "/" +
        this.release_date.substring(5, 7) +
        "/" +
        this.release_date.substring(0, 4)
      );
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

  .row > div {
    padding: 0px;

    h4 {
      margin-top: 10px;
      padding: 0px 15px;
    }
  }

  .film-sheet--poster {
    margin-top: 10px;
    width: 30%;
  }

  .film-sheet--screenshot {
    width: 100%;
  }

  .film-sheet--description {
    font-size: 70%;
    padding: 20px 30px;
    text-align: justify;
    margin-bottom: 0px;
  }

  .film-sheet--parution {
    text-align: right;
    font-size: 80%;
    color: darkgray;
    padding-right: 40px;
    margin-bottom: 0px;
  }
}
</style>
