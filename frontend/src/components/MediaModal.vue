<template>
  <Modal className="media-modal" :open="open" @close="$emit('close')" :title="data?.[data?.type]?.title"
    :description="data?.[data?.type]?.overview" :show-close="!loading && !error && !!data">
    <template v-if="loading">
      <p>Loading..</p>
    </template>
    <template v-else-if="error">
      <p>Error</p>
    </template>
    <template v-else-if="data">
      <template v-if="data?.[data?.type]?.posterPath">
        <img v-if="data?.type == 'film'" :src="'https://image.tmdb.org/t/p/w500/' + data?.[data?.type]?.posterPath
          " />
      </template>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Modal from "./Modal.vue";

const props = defineProps<{ open: boolean; data: string }>();

import { backendAPIRoutes } from "../utils/media.ts";
const { fetchCustom, error, loading, data } = backendAPIRoutes();

onMounted(() => {
  fetchData();
});

// Fetch the data for the supplied record
const fetchData = async () => {
  // Split on - but capture everything after as one group to counter multiple - filter off the empty string
  const splits = props.data.split(/-(.*)/).filter((x) => x);

  try {
    await fetchCustom(`${splits[0]}/${splits[1]}?include=history,${splits[0]}`);
  } catch { }

};
</script>
