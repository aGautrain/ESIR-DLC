<template>
  <div>
    <form class="query-filter form-inline">
      <input v-model="filter" type="text" class="form-control" placeholder="Look for a specific film.." />
      <button v-on:click="filterResults" type="button" class="btn btn-primary">SEARCH</button>
    </form>

    <div class="genre-filter">
      <span v-for="(val, key) in genres"
            v-bind:key="key"
            v-bind:class="['badge', {'badge-dark': genresFilterContains(key)}, {'badge-light': !genresFilterContains(key)}]"
            v-on:click="clickGenreBadge(key)">
        {{val}}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { GenreFinder } from "../libs/genres";

export default Vue.extend({
  name: "SearchBar",
  data: function(): {
    filter: string;
    genres: { [key: number]: string };
    genresFilter: number[];
  } {
    return {
      filter: "",
      genres: GenreFinder.idToGenre,
      genresFilter: []
    };
  },
  methods: {
    filterResults: function(): void {
      console.log("Filtering films with title === ", this.filter);
      this.$emit("filter-name-request", this.filter);
    },
    genresFilterContains: function(key: string): boolean {
      return this.genresFilter.indexOf(parseInt(key)) > -1;
    },
    clickGenreBadge: function(key: string): void {
      let keyAsInt: number = parseInt(key);

      if (this.genresFilter.indexOf(keyAsInt) > -1) {
        this.genresFilter.splice(this.genresFilter.indexOf(keyAsInt), 1);
      } else {
        this.genresFilter.push(keyAsInt);
      }
      this.$emit("filter-genre-request", this.genresFilter);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.query-filter {
  width: 50%;
  margin: auto;
  input {
    width: 80%;
    border-radius: 0px;
  }
  button {
    width: 20%;
    border-radius: 0px;
  }
}

.genre-filter {
  width: 65%;
  text-align: center;
  margin: auto;

  .badge {
    margin: 2px 5px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
