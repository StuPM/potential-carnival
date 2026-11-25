<template>
    <div class="flex flex-wrap gap-2">
        <UButton v-for="opt in options" :key="opt" :label="opt" size="sm" color="neutral"
            class="rounded-full font-mono" />
    </div>

</template>
<script setup lang="ts">
const props = defineProps(['options'])



</script>