<template>
  <!-- UApp provides the shared setup Nuxt UI's popovers, modals and toasts need -->
  <UApp>
    <RouterView />
  </UApp>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
