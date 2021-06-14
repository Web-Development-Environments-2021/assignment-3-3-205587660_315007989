<template>
  <mdb-datatable-2  v-model="data"  />
</template>

<script>
import { mdbDatatable2 } from "mdbvue";
export default {
  name: "SearchPlayer",
  components: {
    mdbDatatable2,
  },
  data() {
    return {
        props: {
        FullName: {
        type: String,
        required: true
      },
        TeamName: {
        type: String,
        required: true
      },
        Position: {
        type: String,
        required: true
      },
        Image: {
        type: String,
        required: false
      },
                rows: [],
},
      data: {
        columns: [
          {
            label: "FullName",
            field: "Full Name",
            sort: true,
          },
          {
            label: "TeamName",
            field: "Team Name",
            sort: true,
          },
          {
            label: "Position",
            field: "Position",
            sort: true,
          },
          {
            label: "Image",
            field: "Image",
          },
        ],
        rows: [],
      },
    };
  },
};
</script>
