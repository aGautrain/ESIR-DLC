<template>
<div>
  <b>id#{{item.id}}</b>
  <p>{{item.title}}</p>
</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SearchBarItem",
  props: {
    item: { required: true },
    searchText: { required: true }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
