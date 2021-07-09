<template>
  <mdb-container>
    <mdb-datatable-2 v-model="data" striped bordered arrows :display="3" />
<button v-on:click="console.log(432);">Add 1</button>  </mdb-container>
</template>

<script>
import { mdbDatatable2, mdbContainer } from "mdbvue";
import Vue from "vue";

import GameEventButton from "../components/GameEventButton.vue";
export default {
  name: "GameTable",
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
      },
    };
  },
  methods: {
    hello(){
      console.log(432)
    },
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
    //       let keys = ["gameID", "home\ Team","away\ Team","home\ Score","away\ Score","stadium","game\ Date","referee","stage","home Team \ Name"
    // ,"away Team\ Name","hour"];
    let keys = [
      "gameID",
      "homeTeam",
      "awayTeam",
      "homeScore",
      "awayScore",
      "stadium",
      "referee",
      "stage",
      "homeTeamName",
      "awayTeamName",
      "gameDate",
      "hour",
      "EventLog",
    ];
    var today = new Date();
    today = today.toISOString();
    let entries = this.results;
    entries.forEach((element) => {
      if (element.gameDate < today) {
        element.EventLog = `<button v-on:click="console.log(432);">Add 1</button>`;
      }
      element.gameDate = element.gameDate.substring(0, 10);
      element.hour = element.hour.substring(11, 16);
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
