<template>
  <div>
    <GamePreview
      v-for="g in games"
      :id="g.game_id"
      :hostTeam="g.homeTeam"
      :guestTeam="g.awayTeam"
      :date="g.gameDate"
      :hour="g.hour"
      :key="g.game_id"
    ></GamePreview>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview,
  },
  data() {
    return {
      games: [],
    };
  },
  methods: {
    async updateGames() {
      console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/homepage/favoritematches"
        );
        console.log(response.data);
        var today = new Date();
        today = today.toISOString();
        const old_games = response.data.filter((game) => game.gameDate < today);
        this.games= response.data.filter((game) => game.gameDate > today);
        
        console.log(old_games);
        this.$root.toast(
          "Removed from favorites", `Removed ${old_games.length} old games from favorites `,
          "success"
        );
        old_games.forEach(async (element) =>  {
          var url = `http://localhost:3000/homepage/favoritematches/${element.game_id}`;
          var response1 = await this.axios.delete(url, {}, {});
        });
      } catch (error) {
        console.log("error in update games");
        console.log(error);
      }
    },
  },
  mounted() {
    console.log("favorite games mounted");
    this.updateGames();
  },
};
</script>

<style></style>
