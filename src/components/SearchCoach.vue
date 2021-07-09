<template>
  <mdb-container>
    <mdb-datatable-2 v-model="data" striped bordered arrows :display="3" />
  </mdb-container>
</template>

<script>
import { mdbDatatable2, mdbContainer } from "mdbvue";
export default {
  name: "SearchCoach",
  components: {
    mdbDatatable2,
    mdbContainer,
  },
  props: {
    results: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      data: {
        rows: [],
        columns: [],
        first: true,
      },
    };
  },
  methods: {
    filterData(dataArr, keys) {
      let data = dataArr.map((entry) => {
        let filteredEntry = {};
        keys.forEach((key) => {
          if (key in entry) {
            filteredEntry[key] = entry[key];
          }
        });
        return filteredEntry;
      });
      return data;
    },
  },
  mounted() {
    let keys = ["name", "team_name", "image"];
    let entries = this.results;

    entries.forEach((element) => {
      let tmp = element.image;
      element.name = `<a href="#/Coach/${element.coach_id}" class="" target="_self"> ${element.name}</a>`;
      element.team_name = `<a href="#/Team/${element.team_id}" class="" target="_self"> ${element.team_name}</a>`;
       console.log(element);
      if (element.image) {
        element.image = `<img src= ${tmp}></img>`;
        //  console.log("test")
      }
      //         element.image=`<img src= ${tmp}></img>`
    });

    const columns = keys.map((key) => {
      return {
        label: key.toUpperCase(),
        field: key,
        sort: true,
      };
    });
    //rows

    this.data = {
      columns,
      rows: entries,
    };
  },
};
</script>
