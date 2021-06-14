<template>
  <div>
    <GamePreviewDetial
         v-for="g in games"
          :id="g.gameID"
          :referee="g.referee"
          :stadium="g.stadium"
          :stage="g.stage"
          :hostTeamID="g.homeTeam"
          :hostTeam="g.homeTeamName"
          :guestTeamID="g.awayTeam"
          :guestTeam="g.awayTeamName"
          :date="g.gameDate"
          :hour="g.hour"
          :key="g.gameID"
    ></GamePreviewDetial>
  </div>
</template>

<script>
import GamePreviewDetial from "./GamePreviewDetial.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreviewDetial,
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
        this.games = response.data.filter((game) => game.gameDate > today);

        console.log(old_games);
        if (old_games.length > 0) {
          this.$root.toast(
            "Removed from favorites",
            `Removed ${old_games.length} old games from favorites `,
            "success"
          );
          old_games.forEach(async (element) => {
            var url = `http://localhost:3000/homepage/favoritematches/${element.game_id}`;
            var response1 = await this.axios.delete(url, {}, {});
          });
        }
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
