import { defineStore } from "pinia";
import { useMediaQuery } from "@vueuse/core";

import { type filterTag, type mediaRecord } from "../utils/types";
import { backendAPIRoutes } from "../utils/media";

export const useMediaStore = defineStore("media", {
  state: () => {
    return {
      count: 0,

      loading: false,

      records: [] as mediaRecord[], // Records from the database

      searchString: "", // Filter string from SearchBar

      filterTag: "All" as filterTag,

      isMobile: useMediaQuery("(max-width: 600px)"),
    };
  },
  getters: {
    filtered: (state) => {
      const q = state.searchString.trim().toLowerCase();

      return state.records.filter((record) => {
        console.log(record);
        return (
          record.media.title.toLowerCase().includes(q) ||
          record.media.originalTitle.toLowerCase().includes(q)
        );
      });
    },
  },
  actions: {
    increments() {
      this.count++;
    },
    async load() {
      // TODO
      // Here I need to cll the api to get the basic information that is required

      this.loading = true;
      // this.error = null

      try {
        this.records = await backendAPIRoutes().fetchMedia();
      } catch (e) {
        // this.error = e
      } finally {
        this.loading = false;
      }
    },
  },
});
