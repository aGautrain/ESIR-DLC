<template>
<div class="card-container">
    <div class="card" v-on:click="clickThumbnail">
      <template v-if="posterImage">
        <img class="card-img-top" v-bind:src="posterImage" alt="Movie thumbnail">
      </template>

      <div class="card-body">
        <h1 v-if="titleSize === 1" class="card-title">{{ title }}</h1>
        <h2 v-else-if="titleSize === 2" class="card-title">{{ title }}</h2>
        <h3 v-else-if="titleSize === 3" class="card-title">{{ title }}</h3>
        <h4 v-else-if="titleSize === 4" class="card-title">{{ title }}</h4>
        <h5 v-else-if="titleSize === 5" class="card-title">{{ title }}</h5>
        <h6 v-else class="card-title">{{ title }}</h6>
        <p class="card-text card-description">{{ movieDescription }}</p>
      </div>

      <div class="card-zoom">
      </div>
    </div>
    <div class="genres-badges">
      <span v-for="genre in mainGenres" v-bind:key="id + '_' + genre" class="badge badge-light">{{genre}}</span>
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
    vote_count: Number,
    filmotron_genres: Array
  },
  methods: {
    clickThumbnail: function(): void {
      console.log("sending ", this.$props);
      this.$emit("thumbnail-click", this.$props);
    }
  },
  computed: {
    posterImage: function(): string {
      return apiPosterEndpoint + this.backdrop_path;
    },
    movieDescription: function(): string {
      return (this.overview as string).slice(0, 400).trim() + "...";
    },
    titleSize: function(): number {
      const length: number = (this.title as string).length;
      let size: number = 0;
      if (length < 8) {
        size = 2;
      } else if (length < 12) {
        size = 3;
      } else if (length < 16) {
        size = 4;
      } else if (length < 24) {
        size = 5;
      } else {
        size = 6;
      }
      return size;
    },
    mainGenres: function(): string[] {
      return (this.filmotron_genres as string[]).splice(0, 1);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card-container {
  padding: 20px 10px;

  .card {
    height: 200px;
    overflow: hidden;
    border-radius: 0px;

    .card-img-top {
      position: relative;
      top: 0px;
      border-radius: 0px;
    }

    .card-description {
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

  .genres-badges {
    position: absolute;
    left: 0px;
    width: 100%;
    display: none;
    text-align: right;

    .badge {
      margin: 2px;
    }
  }
}

.card-container:hover {
  .card:hover {
    cursor: pointer;
    .card-img-top {
      display: none;
    }
    .card-title {
      border-bottom: solid lightgray 1px;
      padding-bottom: 10px;
    }
    .card-description {
      display: block;
    }
    .card-zoom {
      display: block;
    }
  }

  .genres-badges {
    display: block;
  }
}
</style>
