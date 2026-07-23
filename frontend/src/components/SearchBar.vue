<template>
  <section>
    <search>
      <label for="search">search~$</label>
      <input type="search" id="search" />
    </search>
    <tag-list></tag-list>
  </section>
</template>
<script setup lang="ts">
import TagList from "./TagList.vue";

/**
 * TODO
 * Search string to filter the existing data
 * Initial just search the name
 * But then add the directory, rating, location, date, rewatched
 * Can we use hashtags to search?
 */
</script>
<style scoped sass>
section {
  display: flex;
}
</style>
