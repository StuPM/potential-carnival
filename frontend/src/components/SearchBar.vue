<template>
  <section>
    <p>></p>
    <search>
      <label for="search">$</label>
      <input type="search" id="search" v-model="store.filterString" autocomplete="off" />
    </search>
    <!-- <tag-list /> -->
    <p>filter</p>
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

.mobile section { 
  width: 100%;

  search {
    width: 100%;
  }

}

section {
  display: flex;

  border: 1px solid pink;
}
</style>
