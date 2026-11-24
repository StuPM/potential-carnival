<template>

  <div class="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
    <div v-for="record in store.filtered" @click="clickOnRecord(record)">
      <img v-if="record.media.type == 'film'" :src="'https://image.tmdb.org/t/p/w342/' + record.media.posterPath" />
      <div v-else>{{ record.media.title }}</div>
    </div>

    <UModal v-model:open="drawerOpen" fullscreen :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full'
    }" :ui="{ wrapper: 'flex-1 min-w-0 overflow-hidden', close: 'static shrink-0' }">

      <template #title>
        <Vue3Marquee :clone="true" :animate-on-overflow-only="true">
          <span class="pr-12">{{ modalTitle }}</span>
        </Vue3Marquee>
      </template>

      <template #body>
        <div v-if="openRecord" class="flex flex-col">
          <div class="flex">
            <div class="flex flex-col relative w-1/2 aspect-[2/3] rounded-md overflow-hiddsen ">
              <!-- TODO Could turn into component v-if="openRecord.media.type == 'film'" -->
              <img class="w-full h-full object-cover"
                :src="openRecord.media.posterPath ? 'https://image.tmdb.org/t/p/w342/' + openRecord.media.posterPath : '/poster-placeholder.svg'" />
              <div>
                <div>{{ format(parseISO(openRecord.finished), 'dd/MM/yyyy') }}</div>
                <div>{{ openRecord.location }}</div>
              </div>
            </div>
            <div class="right flex flex-col">
              <div>
                <p>Rating:</p>
                <UInputRating :step="0.5" v-model="modelReview" readonly hoverable />
              </div>
              <div>Released: {{ format(parseISO(openRecord.finished), 'dd/MM/yyyy') }}</div>
              <div>Length</div>
              <div>Genres
                <!-- todo fix this -->
                <template v-for="genre in openRecord.media.genres">
                  <UBadge :label="genre.toUpperCase()" />
                </template>
              </div>
              <!-- TODO Need to store this first -->
              <!-- <div>Director</div> -->

              <!-- TODO Need to get the information -->
              <!-- <div>watch count</div> -->
            </div>
          </div>

          <section>
            <h3>Synopsis</h3>
            <p>{{ openRecord.media.overview }}</p>
          </section>

          <!-- v-if="openRecord.review" -->
          <section>
            <h3 class="font-semibold">Review</h3>
            <p>{{ openRecord.review }}</p>
          </section>

          <section>
            <h3>History</h3>
          </section>

        </div>
      </template>
    </UModal>

  </div>
</template>
<script setup lang="ts">

import { computed, onMounted, ref } from "vue";
import type { mediaRecord } from "../utils/types";
import { useMediaStore } from '../store/pinia';
import { format, parseISO } from "date-fns";
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

const modalTitle = computed(() => {
  if (openRecord.value?.media.title !== openRecord.value?.media.originalTitle) {
    return openRecord.value?.media.title + ' / ' + openRecord.value?.media.originalTitle
  }
  return openRecord.value?.media.title
})


const modelReview = computed(() => {
  return Number(openRecord.value?.rating) / 2
})

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
