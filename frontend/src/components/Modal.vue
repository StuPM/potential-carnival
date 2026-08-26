<template>
  <DialogRoot :open="open" @update:open="
    (v) => {
      if (!v) $emit('close');
    }
  ">
    <DialogPortal>
      <DialogOverlay class="dialog__overlay" />
      <DialogContent class="dialog__content" :class="className">
        <DialogTitle v-if="title || $slots.title">
          <slot name="title">{{ title }}</slot>
        </DialogTitle>
        <VisuallyHidden v-else>
          <DialogTitle />
        </VisuallyHidden>

        <DialogDescription v-if="description || $slots.description">
          <slot name="description">{{ description }}</slot>
        </DialogDescription>
        <VisuallyHidden v-else>
          <DialogDescription />
        </VisuallyHidden>

        <slot />

        <button v-if="showClose" @click="$emit('close')">Close</button>
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
  VisuallyHidden,
} from "reka-ui";

defineProps<{
  open: boolean;
  className: string;
  title?: string;
  description?: string;
  showClose?: boolean;
}>();
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
