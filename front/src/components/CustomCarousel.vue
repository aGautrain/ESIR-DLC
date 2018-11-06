<template>
  <div class="custom-carousel">
    <carousel :perPage="1" :autoplay="true" :autoplayTimeout="1000" :autoplayHovePause="false">
      <slide v-for="result in results" v-bind:key="result.id">
        <img v-bind:src="'http://image.tmdb.org/t/p/w500' + result.backdrop_path" />
      </slide>
    </carousel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Carousel, Slide } from "vue-carousel";

import { FilmInterface } from "../interfaces/film.interface";

declare var apiPosterEndpoint: string;

export default Vue.extend({
  name: "CustomCarousel",
  components: {
    Carousel,
    Slide
  },
  props: {
    results: Array
  },
  methods: {
    getPoster: function(pathEnd: string): string {
      return apiPosterEndpoint + pathEnd;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.custom-carousel {
  width: 50%;
  margin: 50px auto;
}
</style>
