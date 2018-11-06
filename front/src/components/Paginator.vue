<template>
  <nav>
    <button class="btn btn-secondary" v-on:click="loadMore">VOIR PLUS</button>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Paginator",
  methods: {
    loadMore: function(): void {
      this.$emit("load-more", true);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
nav {
  margin-top: 20px;

  button {
    border-radius: 0px;
    width: 20%;
  }
}
</style>
