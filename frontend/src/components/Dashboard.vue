<template>
  <section id="center">
    <TitleBlock></TitleBlock>
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
</script>

<style>
body {
  border: 1px solid black;
}
</style>
