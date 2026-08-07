<template>
  <table>
    <thead>
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <th
          v-for="header in headerGroup.headers"
          :key="header.id"
          :class="header.column.getCanSort() ? 'sortable-header' : ''"
          @click="header.column.getToggleSortingHandler()?.($event)"
        >
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
      <tr
        v-for="row in table.getRowModel().rows"
        :key="row.id"
        v-on:click="test(row.original)"
      >
        <td v-for="cell in row.getAllCells()" :key="cell.id">
          <FlexRender :cell="cell" />
        </td>
      </tr>
    </tbody>
  </table>
  <!-- <Model :open="modelOpen" @close="modelOpen = false" :data="clickedRow" /> -->

  <MediaModel v-if="modelOpen" :open="modelOpen" @close="modelOpen = false" :data="clickedRow" />
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

import { backendAPIRoutes } from "../utils/media";
import { format } from "date-fns";

import Model from "./Modal.vue";
import MediaModel from "./MediaModel.vue";

const { fetchMedia } = backendAPIRoutes();

type innerMediaRecord = {
  type: "manga" | "film";
  title: string;
  director: string; // TODO
};

type MediaRecord = {
  created: string;
  finished: string;
  id: string;
  location: "cinema" | "home";
  media: innerMediaRecord;
  rating: number;
  review: string;
};

const tableData = ref<MediaRecord[]>([]);

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
    datetime: sortFn_datetime,
  },
});

const columnHelper = createColumnHelper<typeof features, MediaRecord>();

const columns: Array<ColumnDef<typeof features, MediaRecord>> =
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
      header: "Type",
      enableSorting: false,
    }),
    columnHelper.accessor("media.title", {
      header: "Title",
      enableSorting: false,
    }),
    columnHelper.accessor((row) => row.media?.director ?? "TEST", {
      id: "director",
      header: "Director",
      enableSorting: false,
    }),
    columnHelper.accessor((row) => row?.location?.toUpperCase(), {
      id: "location",
      header: "Where",
      enableSorting: false,
    }),
    columnHelper.accessor("rating", { header: "Rating" }),
  ]);

const table = useTable({
  features,
  get data() {
    return tableData.value;
  },
  columns,
});

const modelOpen = ref(false);
const clickedRow = ref(null);

// TODO Add model
const test = (row: any) => {
  console.log(row);
  modelOpen.value = !modelOpen.value;
  clickedRow.value = row.mediaId;
};

onMounted(async () => {
  try {
    tableData.value = await fetchMedia();
  } catch (error) {
    console.error("Failed to fetch media:", error);
  }
});
</script>
