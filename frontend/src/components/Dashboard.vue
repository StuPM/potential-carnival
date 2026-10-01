<template>
  <section id="center" :class="{ mobile: store.isMobile }">
    <!-- <TitleBlock></TitleBlock> -->
    <!-- <p>@SPM - 1 film watched, 10 books read, 1 manga</p> -->
    <Search></Search>
    <DataBlock></DataBlock>
    <Footer></Footer>
  </section>
</template>
<script setup lang="ts">
import TitleBlock from "./TitleBlock.vue";
import Search from "./SearchBar.vue";
import DataBlock from "./DataBlock.vue";
import Footer from "./Footer.vue";

import { useMediaStore } from '../store/pinia';
const store = useMediaStore()
</script>

<style>
body {
  /* border: 1px solid black; */
}
</style>
