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
      <p>date2 {{ dates2 }}</p>
      <NumberFlow :value="stats?.lastUpdated" />
    </section>
    <section class="tracked">
      <p>tracked by Stuart</p>
      <p>since 2022</p>
      <p><NumberFlow :value="stats?.totalEntries" /> entries</p>
    </section>
  </header>
</template>
<script setup lang="ts">
import {
  differenceInDays,
  formatDistance,
  formatDistanceToNow,
  subDays,
} from "date-fns";
import { computed, onMounted, ref } from "vue";
import NumberFlow from "@number-flow/vue";

const BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL;
/**
 * TODO
 * Since is the first media history record
 */
interface ApiStats {
  lastUpdated: number;
  totalEntries: number;
}

const defaultApiStats: ApiStats = {
  lastUpdated: subDays(new Date(), 100),
  totalEntries: 0,
};

const stats = ref<ApiStats>({ ...defaultApiStats });

const dateDaysAgo = (lastUpdated: string) => {
  let test = formatDistance(subDays(new Date(lastUpdated), 3), new Date(), {
    addSuffix: false,
  });

  console.log("TEST", test);
  return test;
};

const dates2 = computed(() => {
  const today = new Date();
  console.log(stats.value.lastUpdated);

  let temp = formatDistanceToNow(stats.value.lastUpdated, { addSuffix : true});
  // console.log(temp);

  // get out the 3 values
  console.log(temp.match(/^(.*?)(?<value>\d+)(.*)$/))
  // console.log(/^(.*?)(\d+)(.*)$/.exec(temp))


  return temp
});

onMounted(async () => {
  console.log("I am mounted");

  try {
    const res = await fetch(`${BACKEND_URL}stats`);
    if (!res.ok) throw new Error("Failed to fetch stats");

    stats.value = await res.json();
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
