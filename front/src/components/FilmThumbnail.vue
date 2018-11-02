<template>
  <div class="film-thumbnail">
    <h1>{{ title }}</h1>
    <p>{{ overview }}</p>
    <img v-bind:src="poster_path" width="100" height="100" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "FilmThumbnail",
  // props inspired from Firebase data structure
  props: {
    id: Number,
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
    vote_count: Number
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
