<template>
  <div>
    <h1 class="title">Search Page</h1>
    <div id="app">
      <!-- <span class="input-group-text" id="basic-addon1">Search Subject</span> -->
      <span>Search Object:</span>
      <select v-model="selectedObject">
        <option value="">Select a Search Object</option>
        <option v-for="(i, object) in objects" :key="object">
          {{ object }}
        </option>
      </select>
      <span>Filter:</span>
      <select :disabled="selectedObject.length == 0" v-model="selectedFilter">
        <option value="">Select a Filter</option>
        <option v-for="(i, option) in objects[selectedObject]" :key="option">
          {{ i }}
        </option>
      </select>

      <b-input-group
        v-if="
          (this.selectedFilter && this.selectedFilter != `Select a Filter`) ||
          this.filterQuery.length > 0
        "
        prepend="Filter :"
        id="Filter-input"
      >
        <b-form-input v-model="filterQuery">
          {{ filterQuery }}
        </b-form-input>

        <b-input-group-append> </b-input-group-append>
      </b-input-group>
      <b-input-group prepend="Search Query:" id="search-input">
        <b-form-input v-model="searchQuery"></b-form-input>

        <b-input-group-append>
          <b-button @click="Search" variant="success">Search</b-button>
        </b-input-group-append>
      </b-input-group>

      <div>
    <!-- <div v-if="(this.sessionstorage.getItem(`PreviousQuery`))">
          <span><center>Your Current Search is:</center></span>
        </div> -->
        <div v-if="!this.results ||( this.submitted &&this.results.length == 0)">
          <span><center>could not find any results</center></span>
        </div>
        <div
          v-if="
            (this.submitted &&  this.results && this.results.length > 0 && this.selectType == `Player`) || SelectType === `Player`">
          <SearchPlayer :results="results"> </SearchPlayer>
        </div>

        <div v-if="( this.submitted &&  this.results && this.results.length > 0  &&  this.selectType == `Coach`)  || SelectType == `Coach`">
          <SearchCoach :results="results"> </SearchCoach>
        </div>
        <div v-if="(this.submitted &&    this.results && this.results.length > 0 && this.selectType == `Team` ) || SelectType == `Team`">
          <SearchTeam :results="results"> </SearchTeam>
        </div>
      </div>
    </div>

    <br />
    Your search Query: {{ searchQuery }}
  </div>
</template>


<script>
import SearchPlayer from "../components/SearchPlayer.vue";
import SearchCoach from "../components/SearchCoach.vue";
import SearchTeam from "../components/SearchTeam.vue";

export default {

  name: "tmp",
  components: {
    SearchPlayer,
    SearchCoach,
    SearchTeam,
  },

  data() {
    return {
      //variables that makes the logical connection between object type and types of filter
      objects: { Player: ["Position", "Team"], Coach: ["Team"], Team: [] },
      filters: [],
      searchQuery: "", //variables that change everytime without pressing  the sumbit button
      selectedObject: "",
      selectedFilter: "",
      filterQuery: "",
      results: [], //variables that change after pressing the sumbit putton
      submitted: false,
      error: false,
      SelectType:"",

      PrevQuery:{ // variable for remmembering previous query
        objectType:"",
        query:"",
        filterType:"",
        filterDetail:"",
        results:[],
      }
      
    };
  },
  watch: {
    selectedObject: function () {
      this.filters = [];
      this.selectedFilter = "";
      this.filterQuery="";
      if (this.selectedObject.length > 0) {
        this.filters = this.objects[this.selectedObject];
      }
    },
  },
  methods: {
    async SetPrevQueryInMemory(){
      sessionStorage.setItem("PreviousQuery",JSON.stringify(this.PrevQuery))
    },

    async SaveQueryDetails() {
      this.PrevQuery.results=JSON.stringify(this.results);
      this.PrevQuery.query=this.searchQuery;
      this.PrevQuery.filterType=this.selectedFilter
      this.PrevQuery.filterDetail=this.filterQuery
      this.PrevQuery.objectType=this.selectType
    },
    async Search() {
      var response = [];
      this.error=false;
      this.selectType = "";
      this.results = [];
      try {
        if(!this.searchQuery){
          this.error=true;
        }
        this.PrevQuery.query=this.searchQuery;
        console.log(this.PrevQuery.query);
        if (this.selectedObject === "Player") {
          if (this.selectedFilter && this.selectedFilter != "Select a Filter") {
            response = await this.axios.get(`http://localhost:3000/player/SearchPlayerByName/${this.searchQuery}/filterby${this.selectedFilter}/${this.filterQuery}`);
            } 
          else {
            response = await this.axios.get(`http://localhost:3000/player/SearchPlayerByName/${this.searchQuery}`);
            }
            if (response && response.data.length>0){this.selectType = "Player";}
        }
        if (this.selectedObject == "Coach") {
          if (this.selectedFilter && this.selectedFilter != "Select a Filter") {
            response = await this.axios.get(
              `http://localhost:3000/coach/SearchCoachByName/${this.searchQuery}/filterby${this.selectedFilter}/${this.filterQuery}`
            );
          } else {
            response = await this.axios.get( `http://localhost:3000/coach/SearchCoachByName/${this.searchQuery}`);
          }
          if (response && response.data.length>0){this.selectType = "Coach";}
          }
        if (this.selectedObject == "Team") {
          console.log(145);
          this.selectType = "Team";
          response = await this.axios.get(`http://localhost:3000/teams/teamByName/${this.searchQuery}`);
          if (response && response.data.length>0){this.selectType = "Team";}}
        if (response) {
          console.log(response);
          this.results = response.data;
          // console.log(this.selectType)
          // console.log(this.results);
          this.submitted = true;
          this.SaveQueryDetails();
          this.SetPrevQueryInMemory();
        }
      } catch (err) {
        console.log(err);
        this.error = true;
        this.results = [];
      }
    },
  },

  mounted() {
    if (this.error){
      sessionStorage.clear()
    }
    else{   
    if (window.localStorage.getItem('username')&& JSON.parse(sessionStorage.getItem("PreviousQuery"))) {
      var prev=JSON.parse(sessionStorage.getItem("PreviousQuery"))
      this.submitted = true;
      this.results= JSON.parse(prev.results)
      this.filterQuery=prev.filterDetail;
      this.selectType=prev.objectType;
      this.searchQuery=prev.query;
      this.selectedObject=prev.objectType;
      this.selectedFilter=prev.filterType;
      this.filterType=prev.filterType;

    }}
  },
};
</script>

<style scoped>
search-input {
  margin-left: 20px;
  width: 500px;
}
.dropdown {
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.dropdown span {
  display: inline-block;
  width: 80px;
}
</style>