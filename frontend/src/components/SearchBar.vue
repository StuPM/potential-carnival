<template>
  <section>
    <search>
      <label for="search">search~$</label>
      <input type="search" id="search" v-model="store.filterString" />
    </search>
    <tag-list />
  </section>
</template>
<script setup lang="ts">
import TagList from "./TagList.vue";


import { useMediaStore } from "../store/pinia.ts";
const store = useMediaStore()
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
