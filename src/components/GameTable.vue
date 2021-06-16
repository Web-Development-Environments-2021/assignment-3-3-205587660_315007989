<template>

<mdb-container>
  <mdb-datatable-2  
      v-model="data"
      striped
      bordered
      arrows
      :display="3"/>
</mdb-container>
</template>

<script>
import { mdbDatatable2,mdbContainer} from "mdbvue";

export default {
  name: "GameTable",
  components: {
    mdbDatatable2,
    mdbContainer
  },
  props: {
    results: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      data: {
        rows:[],
        columns: [],
      }};}, 
  methods: {
      filterData(dataArr, keys) {
        let data = dataArr.map(entry => {
          let filteredEntry = {};
          keys.forEach(key => {
            if (key in entry) {
              filteredEntry[key] = entry[key];
            }
          });
          return filteredEntry;
        });
        return data;
      }
    },
    mounted(){
        let keys = ["gameID", "homeTeam","awayTeam","homeScore","awayScore","stadium","gameDate","referee","stage","homeTeamName"
        ,"awayTeamName","hour"];
        let entries = this.results;

      
        const columns = keys.map(key => {
          return {
             label: key.toUpperCase(),
            field: key,
            sort: true,
            
          };
        });
        //rows

        this.data = {
          columns,
          rows: entries
        }
      }
    };
</script>
