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
      try {
        const response=JSON.parse(sessionStorage.getItem("Favmatches"));
        if (!response){
          response=[];
        }
        console.log("Favmatches",response);
        let today = new Date();
        today = today.toISOString();
        const old_games = response.filter((game) => game.gameDate < today);
        this.games = response.filter((game) => game.gameDate > today);
        console.log("oldgame",old_games);
        if (old_games.length > 0) {
          this.$root.toast(
            "Removed from favorites",
            `Removed ${old_games.length} old games from favorites `,
            "success"
          );
          old_games.forEach(async (element) => {
            console.log(element);
            let url = `http://localhost:3000/homepage/favoritematches/${element.gameID}`;
            let response1 = await this.axios.delete(url);
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
