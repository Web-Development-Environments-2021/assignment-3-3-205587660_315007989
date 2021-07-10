<template>


<b-container id="main">
    <b-row>
          <b-col id="left">
        <h1 class="title">League Info</h1>

    <LeagueInfo></LeagueInfo>
    </b-col>
    <b-col id="right">

    <LoginPage v-if="!$root.store.username"></LoginPage>
   <FavoriteGames v-else></FavoriteGames>
    </b-col>

    </b-row>


    </b-container>


</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
 import FavoriteGames from "../components/FavoriteGames";
import LoginPage from "../pages/LoginPage";
export default {
  name: "Main Page",
  data() {
    return {
      username: "",
      componentKey: 0,
    };
  },
  methods: {
    forceRerender() {
      console.log("Dfadsfsadfsadf")
      this.componentKey+=1;
    }
  },
  components: {
    LeagueInfo, 
    LoginPage, 
     FavoriteGames
  },
  computed:{
    isOLD: function(){
      return $root.store.username!=""
    }
  }

};
</script>

<style lang="scss" scoped>
.container{
  height:93vh;
  width: 110vw;
  //  background-image: url("../assets/maintest.jpg");
  // background-size: cover;
}
// #RightPart{
//   float:left;
// }

</style>