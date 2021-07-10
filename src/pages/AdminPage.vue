<template>
  <div>
    <div class="container">
          <h1 class="title">All Games</h1>
        <b-button id= "btn" variant="primary" v-b-modal="'add-game'">Add new game</b-button>

        <AddGame :key="componentKey" @myEventName="addGameRender" id="add-game">
        </AddGame>

        <b-button id= "btn" variant="primary" v-b-modal="'score-modal'">Update Score</b-button>
        <AddResult
          :key="componentKey"
          @myEventName="forceRerender"
          id="score-modal"
        >
        </AddResult>

        <b-button  id= "btn" variant="primary" v-b-modal="'add-event'">Add Event to game</b-button>

        <AddEvent id="add-event"> </AddEvent>

        <GameTable
          v-if="this.results && this.results.length > 0"
          :results="results"
          :key="componentKey"
        >
        </GameTable>
        <svg
          src="https://www.superliga.dk/sites/all/themes/superliga/img/logo-superliga.svg"
          fluid
          alt="Responsive image"
        ></svg>
    </div>
  </div>
</template>

<script>
import GameTable from "../components/GameTable.vue";
import AddGame from "../pages/AddGame.vue";
import AddResult from "../pages/AddResult.vue";
import AddEvent from "../pages/AddEvent.vue";
export default {
  name: "Admin Page",
  components: {
    GameTable,
    AddGame,
    AddResult,
    AddEvent,
  },

  data() {
    return {
      results: [],
      componentKey: 0,
    };
  },
  mounted() {
    this.GetAllGames();
  },
  methods: {
    async addGameRender(game) {
      let response = await this.axios.get(`http://localhost:3000/game/allGames`);
      const team= response.data;
      console.log(team)
      var maxA = team.reduce((a,b)=>a.gameID>b.gameID?a:b); // 30 chars time complexity:  O(n)
      console.log("newHame", maxA);

      this.results.push(maxA);
    },
    async forceRerender(gameid, homescore, awayscore) {
      var response = [];
      const gameID = (element) => (element.gameID = gameid);
      const i = this.results.findIndex(gameID);
      this.results[i].awayScore = awayscore;
      this.results[i].homeScore = homescore;
    },

    async GetAllGames() {
      var response = [];
      response = await this.axios.get(`http://localhost:3000/game/allGames`);
      this.results = response.data;
      console.log(response.data);
    },
  },
};
</script>

<style scoped>
#btn{
  margin-right: 20px;
}
</style>