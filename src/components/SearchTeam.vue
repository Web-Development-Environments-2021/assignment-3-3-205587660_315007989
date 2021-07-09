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
  name: "SearchTeam",
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
        let keys = ["team_name","logo_path"];
        let entries = this.results;
        entries.forEach(element => {
          console.log(element);
          element.team_name= `<a href="#/Team/${element.team_id}" class="" target="_self"> ${element.team_name}</a>`;

          let tmp=element.logo_path;
          element.logo_path=`<img src= ${tmp}></img>` 
          
        });

        const columns = keys.map(key => {
          return {
            label: key.toUpperCase(),
            field: key,
            sort: true
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
