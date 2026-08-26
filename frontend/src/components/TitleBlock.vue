<template>
  <header>
    <section class="byline">
      <p>stuart@myFiles</p>
      <p class="test">Personal media log. Films watched, books read.</p>
      <p class="test">Public read-only. Admin access requires auth.</p>
      <!-- TODO Hide before loaded -->
      <p class="test">
        Last updated:
        <NumberFlow :prefix="stats?.prefix" :value="stats?.daysAgo" :suffix="stats?.suffix" />
      </p>
      >
    </section>
    <section class="tracked">
      <p>tracked by Stuart</p>
      <p>
        since
        <NumberFlow :value="stats?.firstCreated" :format="{ useGrouping: false }" />
      </p>

      <p>
        <NumberFlow :value="stats?.totalEntries" /> entries
      </p>
    </section>
  </header>
</template>
<script setup lang="ts">
import { format, formatDistanceToNow } from "date-fns";
import { onMounted, ref } from "vue";
import NumberFlow from "@number-flow/vue";

// TODO LOADING
import { backendAPIRoutes } from "../utils/media";
const { fetchStats } = backendAPIRoutes();

import { type apiStats } from "../utils/types";

const defaultApiStats: apiStats = {
  firstCreated: 1991,
  lastCreated: "",
  totalEntries: 0,

  daysAgo: 0,
  prefix: "",
  suffix: "",
};

const stats = ref<apiStats>({ ...defaultApiStats });

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
  try {
    const res = await fetchStats();

    res["firstCreated"] = format(res?.firstCreated, "yyyy");

    stats.value = { ...distanceBetweenDates(res.lastCreated), ...res };
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
