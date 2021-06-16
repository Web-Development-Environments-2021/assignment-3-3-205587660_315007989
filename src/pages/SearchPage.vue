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
        v-if="this.selectedFilter && this.selectedFilter != `Select a Filter`"
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
        <div v-if="(this.submitted && this.results.length == 0) || this.error">
          <span><center>could not find any results</center></span>
        </div>
        <div
          v-if="this.results && this.results.length > 0 && this.SelectPlayer"
        >
          <SearchPlayer :results="results"> </SearchPlayer>
        </div>

        <div v-if="this.results && this.results.length > 0 && this.SelectCoach">
          <SearchCoach :results="results"> </SearchCoach>
        </div>
        <div v-if="this.results && this.results.length > 0 && this.SelectTeam">
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
  //   name: 'DatatablePage',
  // components: {
  //   mdbDatatable2
  // },
  name: "tmp",
  components: {
    SearchPlayer,
    SearchCoach,
    SearchTeam,
  },
  // name: "SearchCoach",
  // components: {
  //   SearchCoach,
  // },
  // name: "SearchTeam",
  // components: {
  //   SearchTeam,
  // },
  data() {
    return {
      objects: { Player: ["Position", "Team"], Coach: ["Team"], Team: [] },
      filters: [],
      searchQuery: "",
      selectedObject: "",
      selectedFilter: "",
      filterQuery: "",
      results: [],
      submitted: false,
      error: false,
      SelectPlayer: false,
      SelectCoach: false,
      SelectTeam: false,
    };
  },
  watch: {
    selectedObject: function () {
      this.filters = [];
      this.selectedFilter = "";
      if (this.selectedObject.length > 0) {
        this.filters = this.objects[this.selectedObject];
      }
    },
  },
  methods: {
    async SaveQuery() {
      sessionStorage.setItem("PrevQuery", this.searchQuery);
      sessionStorage.setItem("PrevselectedFilter", this.selectedFilter);
      sessionStorage.setItem("PrevFilter", this.filterQuery);
      sessionStorage.setItem("PrevResult", JSON.stringify(this.results));
      sessionStorage.setItem("PrevselectedObject", this.selectedObject);
      sessionStorage.setItem("PrevselectPlayer", this.SelectPlayer);
      sessionStorage.setItem("PrevselectCoach", this.SelectCoach);
      sessionStorage.setItem("PrevSelectTeam", this.SelectTeam);

    },
    async Search() {
      console.log(this.selectedFilter);
      console.log(this.searchQuery);
      console.log(this.selectedObject);
      var response = [];
      this.SelectPlayer=false;
      this.SelectCoach=false;
      this.SelectTeam=false;
      this.results = [];
      try {
        // const url = `http://localhost:3000/teams/teamFullDetails/${team_id}`;
        const url = `http://localhost:3000`;
        if (this.selectedObject === "Player") {
          this.SelectPlayer = true;
          if (this.selectedFilter && this.selectedFilter != "Select a Filter") {
            response = await this.axios.get(
              `http://localhost:3000/player/SearchPlayerByName/${this.searchQuery}/filterby${this.selectedFilter}/${this.filterQuery}`
            );
          } else {
            response = await this.axios.get(
              `http://localhost:3000/player/SearchPlayerByName/${this.searchQuery}`
            );
          }
        }
        if (this.selectedObject == "Coach") {
          this.SelectCoach = true;
          if (this.selectedFilter && this.selectedFilter != "Select a Filter") {
            response = await this.axios.get(
              `http://localhost:3000/coach/SearchCoachByName/${this.searchQuery}/filterby${this.selectedFilter}/${this.filterQuery}`
            );
          } else {
            response = await this.axios.get(
              `http://localhost:3000/coach/SearchCoachByName/${this.searchQuery}`
            );
          }
        }
        console.log("154");
        console.log(this.selectedObject);
        if (this.selectedObject == "Team") {
          this.SelectTeam = true;
          console.log("tmp");
          response = await this.axios.get(
            `http://localhost:3000/teams/teamByName/${this.searchQuery}`
          );
        }
        if (response) {
          console.log(response);
          this.results = response.data;
          this.submitted = true;
          this.SaveQuery();
        }
      } catch (err) {
        console.log(err);
        this.error = true;
        this.results = [];
      }
    },
  },

  mounted() {
    if (sessionStorage.getItem("PrevQuery"))
    {
     this.searchQuery=sessionStorage.getItem("PrevQuery")
    }
    if (sessionStorage.getItem("PrevselectedFilter")){
      this.selectedFilter=sessionStorage.getItem("PrevselectedFilter")
    }
        if (sessionStorage.getItem("PrevFilter")){
      this.filterQuery=sessionStorage.getItem("PrevFilter")
    }
            if (sessionStorage.getItem("PrevResult")){
      this.results=JSON.parse(sessionStorage.getItem("PrevResult"));
    }
              if (sessionStorage.getItem("PrevselectedObject")){
      this.selectedObject=sessionStorage.getItem("PrevselectedObject");
    }
        if (sessionStorage.getItem("PrevselectPlayer")){
      this.SelectPlayer=sessionStorage.getItem("PrevselectPlayer");
    }
            if (sessionStorage.getItem("PrevselectCoach")){
      this.SelectCoach=sessionStorage.getItem("PrevselectCoach");
    }
                if (sessionStorage.getItem("SelectTeam")){
      this.SelectTeam=sessionStorage.getItem("SelectTeam");
    }
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