<template>
  <DialogRoot
    :open="open"
    @update:open="
      (v) => {
        if (!v) $emit('close');
      }
    "
  >
    <DialogPortal>
      <DialogOverlay class="dialog__overlay" />
      <DialogContent class="dialog__content" :class="className">
        <DialogTitle><slot name="title">Details</slot></DialogTitle>

        <slot />

        <slot name="footer" :close="() => $emit('close')">
          <button @click="$emit('close')">Close</button>
        </slot>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "reka-ui";

defineProps<{ open: boolean; className: string }>();
defineEmits<{ close: [] }>();
</script>

<style scoped>
.dialog__overlay {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 0.4);
}

.dialog__content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 28rem;
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.2);
}
</style>
