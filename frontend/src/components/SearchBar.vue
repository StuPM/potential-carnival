<template>
  <section class="fixed top-0 w-full flex flex-row align-middle
  
">
    <UBadge icon="i-lucide-rocket" size="md" color="primary" variant="solid"></UBadge>

    <!-- <UIcon name="i-lucide-lightbulb" class="size-5" /> -->

    <UInput class="grow-2" v-model="store.searchString" />

    <USelect />
  </section>
</template>
<script setup lang="ts">


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
<style scoped sass></style>
