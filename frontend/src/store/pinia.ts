import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { type filterTag } from "../utils/types";

export const useMediaStore = defineStore("media", {
  state: () => {
    return {
      count: 0,
      filterString: "",
      filterTag: "All" as filterTag,
    };
  },
  getters: {},
  actions: {
    increments() {
      this.count++;
    },
    load() {
      // TODO
      // Here I need to cll the api to get the basic information that is required
    },
  },
});

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const name = ref("Eduardo");
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, name, doubleCount, increment };
});
