<template>
  <div>
    <GamePreview
      v-for="g in games"
      :id="g.game_id" 
      :hostTeam="g.homeTeam" 
      :guestTeam="g.awayTeam" 
      :date="g.gameDate" 
      :hour="g.hour" 
      :key="g.game_id"></GamePreview>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview
  }, 
  data() {
    return {
      games: []
    };
  },
  methods: {
    async updateGames(){
      console.log("response");
      try {
        const response = await this.axios.get("http://localhost:3000/homepage/favoritematches");
        response.data.forEach(element => {
          element.gameDate= element.gameDate.substring(0, 10);
        });
        this.games= response.data;

      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.updateGames(); 
  }
};
</script>

<style></style>
