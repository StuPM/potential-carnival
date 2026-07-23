<template>
  <header>
    <section class="byline">
      <p>stuart@myFiles</p>
      <p class="test">Personal media log. Films watched, books read.</p>
      <p class="test">Public read-only. Admin access requires auth.</p>
      <p class="test">
        Last updated:
        {{ stats?.lastUpdated ? dateDaysAgo(stats.lastUpdated) : "Loading..." }}
      </p>
    </section>
    <section class="tracked">
      <p>tracked by Stuart</p>
      <p>since 2022</p>
      <p>{{ stats?.totalEntries || 0 }} entries</p>
    </section>
  </header>
</template>
<script setup lang="ts">
import { formatDistance, subDays } from "date-fns";
import { onMounted, ref } from "vue";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
/**
 * TODO
 * Can we make it type out when we load for an effect
 * Since is the first media history record
 */

interface ApiStats {
  lastUpdated: String;
  totalEntries: Number;
}

const stats = ref<ApiStats | null>(null);

const dateDaysAgo = (lastUpdated: string) => {
  let test = formatDistance(subDays(new Date(lastUpdated), 3), new Date(), {
    addSuffix: true,
  });

  console.log(test);
  return test;
};

onMounted(async () => {
  console.log("I am mounted");

  try {
    const res = await fetch(`${BASE_URL}stats`);
    if (!res.ok) throw new Error("Failed to fetch stats");

    stats.value = await res.json();
  } catch (error) {
    console.error("Error fetching stats:", error);
  }
});
</script>
<style>
.test:before {
  content: "\2192";
}

.tracked {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
