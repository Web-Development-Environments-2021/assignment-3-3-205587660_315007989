<template>
<div>
  <div class="container">
    <h1>LeaugeGame</h1>
        <GameTable
          v-if="this.results && this.results.length > 0"
          :results="results"
          :key=results[-1]
        >
        </GameTable >  </div>
  </div>
</template>

<script>
import GameTable from "../components/GameTable.vue";
export default {
  name: "LeagueGames",
  components: {
    GameTable,
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
      this.$forceUpdate();
      console.log("sdafsadfsdaffdsgaygsdohsfdagifsdaiuipgpugiupgpigipu")
      var response = [];
      response = await this.axios.get(`http://localhost:3000/game/allGames`);
      this.results = response.data;
      console.log(response.data);
    },
  },
};
</script>
