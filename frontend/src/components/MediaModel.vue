<template>
  <Modal :open="open" @close="$emit('close')" className="media-modal">
    <template #title>{{ mediaData?.[mediaType]?.title }} </template>
    <template #description>{{ mediaData?.[mediaType]?.overview || mediaData?.manga?.overview }}</template> 

    <template v-if="mediaData?.[mediaType]?.posterPath">
      <img v-if="mediaType == 'film'" :src="'https://image.tmdb.org/t/p/w250' + mediaData?.[mediaType]?.posterPath"  />
      <!-- <img v-if="mediaType == 'manga'" -->
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Modal from "./Modal.vue";

const props = defineProps<{ open: boolean; data: string }>();

const mediaData = ref()

const mediaType = ref()

onMounted(() => {
  console.log(props.data);

  fetchData();
});

// TODO
// TRY CATCH
// LOADING
const fetchData = async () => {
  const BASE_URL = import.meta.env.VITE_API_BACKEND_URL;1

  // Split on - but capture everything after as one group to counter multiple -
  // Filter off the empty string
  const splits = props.data.split(/-(.*)/).filter((x) => x);

  mediaType.value = splits[0]

  const test = await fetch(BASE_URL + `${splits[0]}/${splits[1]}?include=history,${splits[0]}`);
  const res = await test.json();

  mediaData.value = res

  console.log(res);
};
</script>
