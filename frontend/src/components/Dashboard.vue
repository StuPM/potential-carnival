<template>
  <section id="center" class="pb-16" :class="{ mobile: store.isMobile }">
    <Search></Search>
    <DataBlock></DataBlock>
    <Footer></Footer>
  </section>
</template>
<script setup lang="ts">;
import Search from "./SearchBar.vue";
import DataBlock from "./DataBlock.vue";
import Footer from "./Footer.vue";

import { useMediaStore } from '../store/pinia';
const store = useMediaStore()
</script>
