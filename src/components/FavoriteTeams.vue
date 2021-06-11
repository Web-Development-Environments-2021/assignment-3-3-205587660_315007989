<template>
  <div>
    <TeamPreview
      v-for="t in teams"
      :id="t.team_id"
      :TeamName="t.team_name" 
      :Logo="t.logo_path" 
      :coachName="t.coach_name" 
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
        const response = await this.axios.get("http://localhost:3000/homepage/favoriteteam");
        this.teams= response.data;

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

<style></style>
