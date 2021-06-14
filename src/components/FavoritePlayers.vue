<template>
  <div>
    <FavPlayerPreview
      v-for="p in players"
      :id="p.player_id"
      :FullName="p.name" 
      :TeamName="p.team_name" 
      :team_id="p.team_id" 
      :Photo="p.image" 
      :Position="p.position" 
      :key="p.player_id"></FavPlayerPreview>
  </div>
</template>

<script>
import FavPlayerPreview from "./FavPlayerPreview.vue";
export default {
  name: "FavoritePlayers",
  components: {
    FavPlayerPreview
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
