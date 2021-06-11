<template>
  <div>
    <PlayerPreview
      v-for="p in players"
      :id="p.player_id"
      :FullName="p.name" 
      :TeamName="p.team_name" 
      :Photo="p.image" 
      :Position="p.position" 
      :key="p.player_id"></PlayerPreview>
  </div>
</template>

<script>
import PlayerPreview from "./PlayerPreview.vue";
export default {
  name: "FavoritePlayers",
  components: {
    PlayerPreview
  }, 
  data() {
    return {
      players: []
    };
  },
  methods: {
    async updatePlayers(){
      console.log("response");
      try {
        const response = await this.axios.get("http://localhost:3000/homepage/favoriteplayer");
        this.players= response.data;

      } catch (error) {
        console.log("error in update players")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite players mounted");
    this.updatePlayers(); 
  }
};
</script>

<style></style>
