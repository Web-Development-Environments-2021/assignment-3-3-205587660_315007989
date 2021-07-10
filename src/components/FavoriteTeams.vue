<template>
  <div id="cont">
    <TeamPreview
      v-for="t in teams"
      :id="t.team_id"
      :TeamName="t.team_name" 
      :Logo="t.logo_path" 
      :coachName="t.coach_name" 
      :coach_id="t.coach_id" 
      :key="t.team_id"></TeamPreview>
  </div>
</template>

<script>
import TeamPreview from "./TeamPreview.vue";
export default {
  name: "FavoriteTeams",
  components: {
    TeamPreview
  }, 
  data() {
    return {
      teams: []
    };
  },
  methods: {
    async updateTeams(){
      console.log("response");
      try {
        this.teams=JSON.parse(sessionStorage.getItem("Favteam"));
      } catch (error) {
        console.log("error in update teams")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite teams mounted");
    this.updateTeams(); 
  }
};
</script>

<style scoped>
#cont {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
</style>
