<template>
  <div class="query-result">
      <div class="container">
        <div class="row">
          <FilmThumbnail v-for="film in results" v-on:thumbnail-click="clickThumbnail" v-bind="film" v-bind:key="film.id" class="col-2" />
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FilmThumbnail from "./FilmThumbnail.vue";
import { FilmInterface } from "../interfaces/film.interface";

export default Vue.extend({
  name: "QueryResult",
  components: {
    FilmThumbnail
  },
  props: {
    results: Array
  },
  methods: {
    clickThumbnail: function(film: FilmInterface): void {
      this.$emit("thumbnail-click", film);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
