<template>
  <Modal :open="open" @close="$emit('close')" className="media-modal">
    <template #title>TEST TITLE</template>
    <p>I am a test p</p>
  </Modal>
</template>

<script setup lang="ts">
import { onActivated, onMounted, onUpdated } from "vue";
import Modal from "./Modal.vue";

const props = defineProps<{ open: boolean; data: any }>();

onMounted(() => {
  console.log(props.data);
});
</script>
