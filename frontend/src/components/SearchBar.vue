<template>
  <div class="sticky top-0 z-40 flex items-center gap-2 p-2 bg-default font-mono">
    <UBadge icon="i-lucide-rocket" size="md" color="primary" variant="solid"></UBadge>

    <UInput v-model="store.searchString" placeholder="Search..." class="flex-1">

    </UInput>

    <UPopover :content="{ align: 'end' }">
      <UButton icon="i-lucide-list-filter" :label="String(store.activeFilterCount)" />

      <template #content>
        <div class="w-72 p-3 space-y-3 font-mono text-sm">
          <div>
            <p class="text-xs text-muted mb-1">type</p>
            <FilterPill v-model="store.filterTag" :options="['all', 'film']" />
          </div>

          <USeparator />

          <div>
            <p class="text-xs text-muted mb-1">sort</p>
            <FilterPill :options="['newest', 'oldest', 'rating']" />
          </div>

          <USeparator />

          <div>
            <p class="text-xs text-muted mb-1">jump to year</p>
            <FilterPill :options="['newest', 'oldest', 'rating']" />
          </div>

        </div>



      </template>

    </UPopover>

  </div>
</template>
<script setup lang="ts">


import { useMediaStore } from "../store/pinia.ts";
import FilterPill from "./FilterPill.vue";
const store = useMediaStore()


/**
 * TODO
 * Search string to filter the existing data
 * Initial just search the name
 * But then add the directory, rating, location, date, rewatched
 * Can we use hashtags to search?
 */
</script>
<style scoped sass></style>
