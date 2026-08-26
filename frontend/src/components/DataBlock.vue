<template>
  <table v-if="!store.isMobile">
    <thead>
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <th v-for="header in headerGroup.headers" :key="header.id"
          :class="header.column.getCanSort() ? 'sortable-header' : ''"
          @click="header.column.getToggleSortingHandler()?.($event)">
          <template v-if="!header.isPlaceholder">
            <FlexRender :header="header" />
            {{
              { asc: " 🔼", desc: " 🔽" }[header.column.getIsSorted() as string]
            }}
          </template>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in table.getRowModel().rows" :key="row.id" v-on:click="rowClicked(row.original)">
        <td v-for="cell in row.getAllCells()" :key="cell.id">
          <FlexRender :cell="cell" />
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else-if="store.isMobile">
    <button v-for="row in table.getRowModel().rows" @click="rowClicked(row.original)">
      <div>
        <span>{{ row.getValue('title') }}</span>
        <span>{{ row.getValue('type') }}</span>
      </div>
      <div>
        <span>{{ row.getValue('date') }}</span>
        <span>{{ row.getValue('director') }}</span>
        <span>{{ row.getValue('location') }}</span>
      </div>
      <div>
        <div class="bar">
          <div class="rating" :style="{ width: (Number(row.getValue('rating')) * 10) + '%' }" />
        </div>
        <span>{{ row.getValue('rating') }}</span>
        <span>{{ row.getValue('type') }}</span>
      </div>
    </button>
  </div>
  <MediaModal v-if="!!clickedRowId" :open="!!clickedRowId" @close="clickedRowId = ''" :data="clickedRowId" />
</template>
<script setup lang="ts">
import {
  createColumnHelper,
  FlexRender,
  useTable,
  tableFeatures,
  type ColumnDef,
  createSortedRowModel,
  sortFn_datetime,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
} from "@tanstack/vue-table";
import { onMounted, ref } from "vue";
import { format } from "date-fns";

import MediaModal from "./MediaModal.vue";

import { type mediaRecord } from "../utils/types";
import { backendAPIRoutes } from "../utils/media";
const { fetchMedia } = backendAPIRoutes();

import { useMediaStore } from '../store/pinia';
const store = useMediaStore()

// Stores the data once loaded
const tableData = ref<mediaRecord[]>([]);

// Table features - Mostly sorting functionality at the moment
const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
    datetime: sortFn_datetime,
  },
});

// Create a helper to merge the feature and record types together
const columnHelper = createColumnHelper<typeof features, mediaRecord>();

// Build the columns and what we want them to be able to do
const columns: Array<ColumnDef<typeof features, mediaRecord>> =
  columnHelper.columns([
    columnHelper.accessor(
      (row) => (row.finished ? format(row?.finished, "yyyy-MM-dd") : ""),
      {
        id: "date",
        header: "Date",
        sortFn: "datetime",
      },
    ),
    columnHelper.accessor("media.type", {
      id: "type",
      header: "Type",
      enableSorting: false,
    }),
    columnHelper.accessor("media.title", {
      id: 'title',
      header: "Title",
      enableSorting: false,
    }),
    columnHelper.accessor((row) => row.media?.director ?? "TEST", {
      id: "director",
      header: "Director",
      enableSorting: false,
    }),
    columnHelper.accessor((row) => row?.location?.toUpperCase() ?? 'HOME', {
      id: "location",
      header: "Where",
      enableSorting: false,
    }),
    columnHelper.accessor("rating", { id: 'rating', header: "Rating" }),
  ]);

// Pull all the different parts of the table together
const table = useTable({
  features,
  get data() {
    return tableData.value;
  },
  columns,
});

// Toggle opening the modal when we click on a row 
const clickedRowId = ref("");

// TODO I reckon we can get rid of this function
const rowClicked = (row: mediaRecord) => {
  clickedRowId.value = row.mediaId;
};

onMounted(async () => {
  try {
    tableData.value = await fetchMedia();
  } catch (error) {
    console.error("Failed to fetch media:", error);
  }
});
</script>
