<template>
  <header>
    <section class="byline">
      <p>stuart@myFiles</p>
      <p class="test">Personal media log. Films watched, books read.</p>
      <p class="test">Public read-only. Admin access requires auth.</p>
      <!-- TODO Hide before loaded -->
      <p class="test">
        Last updated:
        <NumberFlow
          :prefix="stats?.prefix"
          :value="stats?.daysAgo"
          :suffix="stats?.suffix"
        />
      </p>
      >
    </section>
    <section class="tracked">
      <p>tracked by Stuart</p>
      <p>since 2022</p>
      <p><NumberFlow :value="stats?.totalEntries" /> entries</p>
    </section>
  </header>
</template>
<script setup lang="ts">
import { formatDistanceToNow } from "date-fns";
import { onMounted, ref } from "vue";
import NumberFlow from "@number-flow/vue";

const BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL;

interface ApiStats {
  lastUpdated: string;
  totalEntries: number;
  prefix: string;
  daysAgo: number;
  suffix: string;
}

const defaultApiStats: ApiStats = {
  lastUpdated: "",
  totalEntries: 0,
  prefix: "",
  daysAgo: 0,
  suffix: "",
};

const stats = ref<ApiStats>({ ...defaultApiStats });

/**
 * Compute distance between a date and now, then pull out the results via regex and
 * @param inputDate string iso date
 */
const distanceBetweenDates = (inputDate: string) => {
  const distance = formatDistanceToNow(inputDate, {
    addSuffix: true,
  });

  const matches = distance.match(
    /^(?<prefex>.*?)(?<daysAgo>\d+)(?<suffix>.*)$/,
  );
  return matches?.groups;
};

onMounted(async () => {
  console.log("I am mounted");

  try {
    const res = await fetch(`${BACKEND_URL}stats`);
    if (!res.ok) throw new Error("Failed to fetch stats");

    const temp = await res.json();

    stats.value = { ...distanceBetweenDates(temp.lastUpdated), ...temp };
  } catch (error) {
    console.error("Error fetching stats:", error);
  }
});
</script>
<style>
.byline {
  text-align: left;
}

.test:before {
  content: "\2192";
}

.tracked {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
