<template>
<div class="card-container">
    <div class="card">
      <img class="card-img-top" v-bind:src="posterImage" alt="Movie thumbnail">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{ movieDescription }}</p>
      </div>

      <div class="card-zoom">
      </div>
    </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
declare var apiPosterEndpoint: string;

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
  },
  computed: {
    posterImage: function(): string {
      return apiPosterEndpoint + this.backdrop_path;
    },
    movieDescription: function(): string {
      return (this.overview as string).slice(0, 400).trim() + "...";
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card-container {
  padding: 10px;

  .card {
    height: 200px;
    overflow: hidden;

    .card-img-top {
      position: relative;
      top: 0px;
    }

    .card-text {
      font-size: 60%;
      display: none;
      text-align: justify;
    }

    .card-zoom {
      display: none;
      position: absolute;
      bottom: 0px;
      right: 0px;
      height: 30px;
      width: 100%;
      background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 1)
      );
    }
  }
}

.card:hover {
  cursor: pointer;
  .card-img-top {
    display: none;
  }
  .card-title {
    border-bottom: solid lightgray 1px;
    padding-bottom: 10px;
  }
  .card-text {
    display: block;
  }
  .card-zoom {
    display: block;
  }
}
</style>
