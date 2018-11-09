<template>
  <div class="search-bar">

    <v-autocomplete :items="items" v-model="item" :get-label="getLabel" :component-item='template' @update-items="updateItems">
    </v-autocomplete>

    <div class="genre-filter">
      <span v-for="(val, key) in genres"
            v-bind:key="key"
            v-bind:class="['badge', {'badge-dark': genresFilterContains(key)}, {'badge-light': !genresFilterContains(key)}]"
            v-on:click="clickGenreBadge(key)">
        {{ val }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { GenreFinder } from "../libs/genres";

import SearchBarItem from "./SearchBarItem.vue";

import Autocomplete from "v-autocomplete";

export default Vue.extend({
  name: "SearchBar",
  components: {
    // eslint-disable-next-line
    "v-autocomplete": Autocomplete
  },
  props: {
    titles: Array
  },
  data: function(): {
    filter: string;
    genres: { [key: number]: string };
    genresFilter: number[];
    template: any;
    item: { id: string; title: string } | null;
    items: Array<{ id: string; title: string }>;
  } {
    return {
      filter: "",
      genres: GenreFinder.idToGenre,
      genresFilter: [],
      template: SearchBarItem,
      item: null,
      items: []
    };
  },
  watch: {
    item: function(
      nextValue: { id: string; title: string } | null,
      oldValue: { id: string; title: string } | null
    ): void {
      if (nextValue && nextValue.title) {
        this.filter = nextValue.title;
      } else {
        this.filter = "";
      }

      this.filterResults();
    }
  },
  methods: {
    // Autocomplete
    getLabel: function(item: { id: string; title: string }): string {
      if (item) {
        return item.title;
      } else {
        return "";
      }
    },
    updateItems: function(text: string) {
      if (text.length > 0) {
        this.items = (this.titles as Array<{
          id: string;
          title: string;
        }>)
          .filter((item: { id: string; title: string }) => {
            if (item.title.length > 0) {
              return item.title.toLowerCase().includes(text.toLowerCase());
            } else {
              return false;
            }
          })
          .slice(0, 5);
      }
    },

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
<style lang="scss">
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

.v-autocomplete {
  .v-autocomplete-input-group {
    .v-autocomplete-input {
      padding: 5px 10px;
      box-shadow: none;
      border: 1px solid black;
      width: 50%;
      margin: auto;
      &.v-autocomplete-selected {
        .v-autocomplete-input {
        }
      }
    }
  }
  .v-autocomplete-list {
    position: absolute;
    width: 50%;
    left: 25%;
    text-align: left;
    border: none;
    border-top: none;
    max-height: 400px;
    overflow-y: auto;
    border-bottom: 1px solid lightgray;
    margin: auto;
    z-index: 10;
    .v-autocomplete-list-item {
      cursor: pointer;
      background-color: #fff;
      padding: 10px 20px;
      border-bottom: 1px solid lightgray;
      border-left: 1px solid lightgray;
      border-right: 1px solid lightgray;
      &:last-child {
        border-bottom: none;
      }
      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>
