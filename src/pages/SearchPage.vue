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

      <b-input-group prepend="Search Query:" id="search-input">
        <b-form-input v-model="searchQuery"></b-form-input>

        <b-input-group-append>
          <b-button @click="Search" variant="success">Search</b-button>
        </b-input-group-append>
      </b-input-group>

      <b-input-group prepend="Filter :" id="Filter-input">
        <b-form-input v-model="filterQuery">
          {{ filterQuery }}
        </b-form-input>

        <b-input-group-append> </b-input-group-append>
      </b-input-group>
      <div>
        <div v-if="(this.submitted && this.results.length == 0) || this.error">
          <span><center>could not find any results</center></span>
        </div>
        <div v-if="this.results && this.results.length > 0 && this.SelectPlayer">
          <SearchPlayer :rows 
v-for="g in results"
            :FullName="g.name"
            :TeamName="g.team_name"
            :Position="g.Position"
            :key="g.player_id"
          >
          </SearchPlayer>
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
    //     SearchCoach,
    // SearchTeam,

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
    async Search() {
      console.log(this.selectedFilter);
      console.log(this.searchQuery);
      console.log(this.selectedObject);
      var response = [];
      // this.submitted=false;
      // this.SelectPlayer=false;
      // this.SelectCoach=false;
      // this.SelectTeam=false;
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
              `${url}/coach/SearchCoachByName/${this.searchQuery}/filterby${this.selectedFilter}/${this.filterQuery}`
            );
          } else {
            response = await this.axios.get(
              `${url}/coach/SearchCoachByName/${this.searchQuery}`
            );
          }
        }

        if (this.selectedObject == "Team") {
          this.SelectTeam = true;
          response = await this.axios.get(
            `${url}/teams/teamByName/${searchQuery}`
          );
        }
        if (response) {
          console.log(response);
          this.results = response.data;
          this.submitted = true;
        }

        // // console.log(response.data);
        // console.log(this.results);
      } catch (err) {
        console.log(err);
        this.error = true;
        this.results = [];
        // console.log(err.response.data);
        // if (err.response.status === 401) {
        //     console.log(this.form.submitError);

        //      this.form.submitError = err.response.data.message;
      }
    },
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