<template>
  <table>
    <thead>
      <tr v-for="headerGroup in table.getHeaderGroups()">
        <th v-for="header in headerGroup.headers">
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
        </th>
      </tr>
      <!-- <tr v-for=""></tr> -->
    </thead>
    <tbody>
      <tr v-for="row in table.getRowModel().rows">
        <td v-for="cell in row.getVisibleCells()">
          <FlexRender
            :render="cell.column.columnDef.cell"
            :props="cell.getContext()"
          />
        </td>
        <!-- <td>2021-01-01</td>
        <td>Film</td>
        <td>The Matrix</td>
        <td>Director</td>
        <td>Cinema</td>
        <td>10</td>
        <td>Rewatch</td> -->
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import {
  createColumnHelper,
  getCoreRowModel,
  FlexRender,
  useVueTable,
} from "@tanstack/vue-table";
import { onMounted, ref } from "vue";

const BASE_URL = import.meta.env.VITE_API_BACKEND_URL;

type MediaRecord = {
  id: string;
  type: string;
  created: string;
};

const tableData = ref<MediaRecord[]>([]);

const columnHelper = createColumnHelper<MediaRecord>();

// const defaultColumns = ref([
//   columnHelper.accessor("id", {
//     header: "TEST",
//   }),
// ]);

const columns = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "details.title",
    header: "Title",
  },

  {
    accessorKey: "details.director",
    header: "Director",
  },

  {
    accessorKey: "where",
    header: "Where",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

const table = useVueTable({
  get data() {
    return tableData.value;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
});

import { backendAPIRoutes } from "../utils/media";

const { fetchMedia } = backendAPIRoutes();

onMounted(async () => {
  let test = await fetchMedia();
  console.log(test);

  try {
    const res = await fetch(`${BASE_URL}media`);
    if (!res.ok) throw new Error("   ");

    tableData.value = await res.json();
  } catch (error) {
    console.log("", error);
  }
});
</script>
<style sass></style>
