<template>
  <div>
      <carousel id="car" :per-page="1" :paginationEnabled="false">
                <slide v-if="games.length == 0">
                  <h1 id= "title" color=white>Favorite Games preview will be shown here</h1>
        </slide>

        <slide v-if="games.length > 0">
          <GamePreviewDetial
            :id="games[0].gameID"
            :referee="games[0].referee"
            :stadium="games[0].stadium"
            :stage="games[0].stage"
            :hostTeamID="games[0].homeTeam"
            :hostTeam="games[0].homeTeamName"
            :guestTeamID="games[0].awayTeam"
            :guestTeam="games[0].awayTeamName"
            :date="games[0].gameDate"
            :hour="games[0].hour"
            :key="games[0].gameID"
          >
          </GamePreviewDetial>
        </slide>
        <slide v-if="games.length > 1">
          <GamePreviewDetial
            :id="games[1].gameID"
            :referee="games[1].referee"
            :stadium="games[1].stadium"
            :stage="games[1].stage"
            :hostTeamID="games[1].homeTeam"
            :hostTeam="games[1].homeTeamName"
            :guestTeamID="games[1].awayTeam"
            :guestTeam="games[1].awayTeamName"
            :date="games[1].gameDate"
            :hour="games[1].hour"
            :key="games[1].gameID"
          >
          </GamePreviewDetial>
        </slide>
        <slide v-if="games.length > 2">
          <GamePreviewDetial
            :id="games[2].gameID"
            :referee="games[2].referee"
            :stadium="games[2].stadium"
            :stage="games[2].stage"
            :hostTeamID="games[2].homeTeam"
            :hostTeam="games[2].homeTeamName"
            :guestTeamID="games[2].awayTeam"
            :guestTeam="games[2].awayTeamName"
            :date="games[2].gameDate"
            :hour="games[2].hour"
            :key="games[2].gameID"
          >
          </GamePreviewDetial>
        </slide>
      </carousel>
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
        let response = JSON.parse(sessionStorage.getItem("Favmatches"));
        if (!response) {
          console.log(sessionStorage);
          console.log(sessionStorage[0]);
          response = [];
        } else {
          response = response.sort((a, b) =>
            a.gameDate > b.gameDate ? 1 : b.gameDate > a.gameDate ? -1 : 0
          );
        }
        let today = new Date();
        today = today.toISOString();
        const old_games = response.filter((game) => game.gameDate < today);
        this.games = response.filter((game) => game.gameDate > today);
        sessionStorage.setItem("Favmatches", JSON.stringify(this.games));

        console.log("oldgame", old_games);
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

<style>
#title{
  color: aquamarine;
}
#cont {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
</style>
