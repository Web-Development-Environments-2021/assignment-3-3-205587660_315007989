<template>
  <div>
    <img id="bg" src="@/assets/1348783.jpg" />

    <LeagueInfo id="LeagueInfo">
      <h1 class="title">League Info</h1>
    </LeagueInfo>
    <!-- <h1 v-if="!$root.store.username">Favorite Games:</h1> -->
    <!-- <h1 v-else> Register</h1> -->
    <div>

      <div id="Login_Wrapper" v-if="!$root.store.username">
        <LoginPage @myEventName=forceRerender id="Login"></LoginPage>
      </div> 
    </div>
    <h1 id="League_Info_titile" class="title">League Info</h1>
    <h1 v-if="$root.store.username" id="Favorite_Games_titile" class="title">Favorite Games</h1>
    <div id="games_Wrapper" v-if="$root.store.username">
      <FavoriteGamesMain :key="componentKey" id="games"></FavoriteGamesMain>
    </div>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGamesMain from "../components/FavoriteGamesMain";
import LoginPage from "../pages/LoginPage";
export default {
  name: "Main Page",
  data() {
    return {
      username: "dafsd afdfsad",
      componentKey: 0,
    };
  },
  methods: {
    forceRerender() {
      console.log("Dfadsfsadfsadf");
      this.componentKey += 1;
    },
  },
  components: {
    LeagueInfo,
    LoginPage,
    FavoriteGamesMain,
  },
  computed: {
    isOLD: function() {
      return $root.store.username != "";
    },
  },
};
</script>

<style lang="scss" scoped>
#Login_Wrapper {
  background-color: #abbaea;
  float: right;
  position: absolute;
  top: 20vh;
  width: 400px;
  height: 250px;
  right: 0;
  padding: 2px;
  margin: 2.5%;
  z-index: 0;
  border: 5px solid;
  opacity: 0.8;
}
#games_Wrapper {
  float: right;
  position: absolute;
  top: 20vh;
  width: 400px;
  height: 638px;
  right: 0;
  padding: 0px;
  margin: 2.5%;
  z-index: 0;
  border: 5px solid;
}

// #title {
//   position: relative;
//   padding-bottom: 300px;
// }
#bg {
  width: 100%;
  background-size: cover;
  z-index: 0;
}
#LeagueInfo {
  float: left;
  position: absolute;
  top: 20vh;
  opacity: 0.75;
  margin: 2.5%;
}
#Login {
  position: relative;
  bottom: 0;
  left: 0;
  z-index: 2;
}
#League_Info_titile {
  position: absolute;
  top: 12vh;
  opacity: 0.75;
  margin: 2.5%;
  color: whitesmoke;
}
#Favorite_Games_titile {
  position: absolute;
  right: 125px;
  top: 12vh;
  opacity: 0.75;
  margin: 2.5%;
  color: whitesmoke;
}
</style>
