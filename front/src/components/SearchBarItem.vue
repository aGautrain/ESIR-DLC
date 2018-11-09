<template>
<div class="searchbar-suggestion">
  <p>{{ left }}<span class="text-found">{{ found }}</span>{{ right }}</p>
</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SearchBarItem",
  props: {
    item: { required: true },
    searchText: String
  },
  computed: {
    left: function(): string {
      const title: string = (this.item as { id: string; title: string }).title;

      const startIndex: number = title
        .toLowerCase()
        .indexOf(this.searchText.toLowerCase());

      return title.substring(0, startIndex);
    },
    found: function(): string {
      const title: string = (this.item as { id: string; title: string }).title;

      const startIndex: number = title
        .toLowerCase()
        .indexOf(this.searchText.toLowerCase());

      return title.substring(startIndex, startIndex + this.searchText.length);
    },
    right: function(): string {
      const title: string = (this.item as { id: string; title: string }).title;

      const startIndex: number = title
        .toLowerCase()
        .indexOf(this.searchText.toLowerCase());

      return title.substring(startIndex + this.searchText.length, title.length);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.searchbar-suggestion {
  z-index: 10;

  p {
    margin-bottom: 0px;
  }

  .text-found {
    text-decoration: underline;
    font-weight: bold;
  }
}
</style>
