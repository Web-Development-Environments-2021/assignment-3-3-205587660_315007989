<template>

  <b-container>
    <b-col id="RightPart">
    <LoginPage v-if="!$root.store.username"></LoginPage>
    </b-col>
    <!-- <FavoriteGames v-if="$root.store.username"></FavoriteGames> -->
    <b-col>
    <LeagueInfo></LeagueInfo>

    </b-col>
  </b-container>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
// import FavoriteGames from "../components/FavoriteGames";
import LoginPage from "../pages/LoginPage";
export default {
  data() {
    return {
      componentKey: 0,
    };
  },
  methods: {
    forceRerender() {
      console.log("DASfasdfasdfsadfgsadf");
      this.componentKey += 1;
      this.$forceUpdate();
    }
  },
  components: {
    LeagueInfo, 
    LoginPage, 
    // FavoriteGames
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
#RightPart{
  float:left;
}

</style>