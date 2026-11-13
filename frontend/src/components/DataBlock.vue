<template>

  <div class="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
    <div v-for="record in store.filtered" @click="clickOnRecord(record)">
      <img v-if="record.media.type == 'film'" :src="'https://image.tmdb.org/t/p/w342/' + record.media.posterPath" />
      <div v-else>{{ record.media.title }}</div>
    </div>

    <UModal v-model:open="drawerOpen" fullscreen :title="openRecord?.media?.title" :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full'
    }">

      <template #body>
        <!-- <Placeholder class="h-48" /> -->
      </template>
    </UModal>

  </div>
</template>
<script setup lang="ts">

import { computed, onMounted, ref } from "vue";
import type { mediaRecord } from "../utils/types";
import { useMediaStore } from '../store/pinia';
const store = useMediaStore()

const openRecord = ref<mediaRecord | null>(null)

/**
 * Whether the drawer should open or not
 * GET - True if a record is selected, otherwise false
 * SET - Close the modal and clear openRecord
 */
const drawerOpen = computed({
  get: () => openRecord.value !== null,
  set: (open) => { if (!open) openRecord.value = null }
})

// Click on a record, save the record and open the modal
const clickOnRecord = (record: mediaRecord) => {
  console.log(record)
  openRecord.value = record
}


// Fetch the data for the supplied record
// const fetchData = async () => {
//   // Split on - but capture everything after as one group to counter multiple - filter off the empty string
//   const splits = props.data.split(/-(.*)/).filter((x) => x);

//   try {
//     await fetchCustom(`${splits[0]}/${splits[1]}?include=history,${splits[0]}`);
//   } catch { }

// };

onMounted(() => {
  store.load()
});
</script>

<style lang="css">
.test2 {
  width: 100%;
  /* display: grid; */
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))
}


.test2 img {
  width: 100%;
  aspect-ratio: 2 / 3;
  /* TMDB posters are 2:3 */
  object-fit: cover;
  /* crop rather than stretch */
  display: block;
}
</style>
