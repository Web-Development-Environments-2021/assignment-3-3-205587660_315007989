<template>
  <div>
    <h1 class="title">All Games</h1>
    <div id="app">
      <div>
        <b-button v-b-modal="'my-modal'">Add new game</b-button>
        <b-modal id="my-modal">
          <template #modal-title>
            Add Game
          </template>
          <AddGame> </AddGame
        ></b-modal>

        <b-button v-b-modal="'score-modal'">Update Score</b-button>
        <b-modal id="score-modal">
          <template #modal-title>
            Update Score
          </template>
          <AddResult> </AddResult
        ></b-modal>

        <b-button v-b-modal="'add-event'">Add Event to game</b-button>
        <b-modal id="add-event">
          <template #modal-title>
            Add Event
          </template>
          <AddEvent> </AddEvent
        ></b-modal>


        <GameTable
          v-if="this.results && this.results.length > 0"
          :results="results"
        >
        </GameTable>
        <svg
          src="https://www.superliga.dk/sites/all/themes/superliga/img/logo-superliga.svg"
          fluid
          alt="Responsive image"
        ></svg>
      </div>
    </div>
  </div>
</template>

<script>
import GameTable from "../components/GameTable.vue";
import AddGame from "../pages/AddGame.vue";
import AddResult from "../pages/AddResult.vue";
import AddEvent from "../pages/AddEvent.vue";
export default {
  name: "games",
  components: {
    GameTable,
    AddGame,
    AddResult,
    AddEvent
  },

  data() {
    return {
      results: [],
    };
  },
  mounted() {
    this.GetAllGames();
  },
  methods: {
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
