<template>
  <div class="tagList">
    <ToggleGroupRoot :model-value="store.filterTag" @update:model-value="(val) => {
      if (val) store.filterTag = val
    }" :default-value="store.filterString">
      <ToggleGroupItem value="All">All</ToggleGroupItem>
      <ToggleGroupItem value="film">film</ToggleGroupItem>
      <ToggleGroupItem value="book">book</ToggleGroupItem>



    </ToggleGroupRoot>

  </div>
</template>
<script setup lang="ts">

import { ToggleGroupRoot, ToggleGroupItem } from 'reka-ui';

import { useMediaStore } from '../store/pinia';
const store = useMediaStore()

/**
 * TODO
 * When I load, get the tags from the database or push up from Dashboard
 * Toggle a type to filter the data
 * Should auto pickup new tables
 */
</script>
<style sass>
.tagList {
  display: flex;
  flex-direction: row;
}
</style>
