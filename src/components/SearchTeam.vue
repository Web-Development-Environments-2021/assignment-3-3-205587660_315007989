<template>
  <mdb-datatable-2 v-model="data" />
</template>

<script>
import { mdbDatatable2 } from "mdbvue";
export default {
  name: "DatatablePage",
  components: {
    mdbDatatable2,
  },
  data() {
    return {
      data: {
        columns: [
          {
            label: "TeamName",
            field: "Team Name",
            sort: true,
          },
          {
            label: "Logo",
            field: "Logo",
          },
        ],
        rows: [],
      },
    };
  },
};
</script>
