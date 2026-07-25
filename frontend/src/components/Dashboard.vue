<template>
  <section id="center">
    <TitleBlock></TitleBlock>
    <Search></Search>
    <DataBlock></DataBlock>

    <Footer></Footer>
  </section>

  <!-- 
    <div class="hero">
      <img :src="heroImg" class="base" width="170" height="179" alt="" />
      <img :src="vueLogo" class="framework" alt="Vue logo" />
      <img :src="viteLogo" class="vite" alt="Vite logo" />
    </div>
    <div>
      <h1>Get started</h1>
      <p>Edit <code>src/App.vue</code> and save to test <code>HMR</code></p>
    </div>
    <button type="button" class="counter" @click="count++">
      Count is {{ count }}
    </button> -->

  <!-- <div class="ticks"></div> -->

  <!-- <section id="next-steps"> -->
  <!-- <div id="docs">
      <svg class="icon" role="presentation" aria-hidden="true">
        <use href="/icons.svg#documentation-icon"></use>
      </svg>
      <h2>Documentation</h2>
      <p>Your questions, answered</p>
      <ul>
        <li>
          <a href="https://vite.dev/" target="_blank">
            <img class="logo" :src="viteLogo" alt="" />
            Explore Vite
          </a>
        </li>
        <li>
          <a href="https://vuejs.org/" target="_blank">
            <img class="button-icon" :src="vueLogo" alt="" />
            Learn more
          </a>
        </li>
      </ul>
    </div> -->

  <!-- </section> -->

  <!-- <div class="ticks"></div> -->
  <!-- <section id="spacer"></section> -->
</template>
<script setup lang="ts">
import TitleBlock from "./TitleBlock.vue";
import Search from "./SearchBar.vue";
import DataBlock from "./DataBlock.vue";
import Footer from "./Footer.vue";
</script>

<style sass>
body {
  /* background-image: url("../test/mockup.svg"); */
  border: 1px solid black;
}
</style>
