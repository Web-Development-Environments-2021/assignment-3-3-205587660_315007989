<template>


<b-container id="main">
  <img id="bg" src='@/assets/1348783.jpg'>
    <b-row>
          <b-col id="left">

    <LeagueInfo id="LeagueInfo">
        <h1 class="title">League Info</h1>
      
    </LeagueInfo>
    </b-col>
    <b-col id="right">
      <!-- <h1 v-if="!$root.store.username">Favorite Games:</h1> -->
      <!-- <h1 v-else> Register</h1> -->
      <div id="Login_Wrapper">
    <LoginPage id="Login" v-if="!$root.store.username"></LoginPage>
      </div>

         <FavoriteGames v-if="$root.store.username"></FavoriteGames>

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
  height:100%;
  width: 100%;
  margin-left:0%;
  margin-right: 0%;
  padding-left: 0%;
  padding-right:0%;
}
// #RightPart{
//   float:left;
// }
// #main{
//   //  background-image: url("../assets/1348783.jpg");
//       // background-size: cover;

// }
#main{
  height:100vh;
  width:100vw;
}

#bg{
  width: 99vw;
  height:92vh;
  background-size: cover;
    z-index:0;

  // margin-right:40%;
}
#LeagueInfo{
  position: relative;
  bottom: 700px;
  opacity: 0.75;

}
#Login{
  position: relative;
  bottom: 700px;
  left: 40px;
}
#Login_Wrapper{
  color:azure;
  border-style: solid;
  border-color: white;
  opacity: 0.75;

}
#id{
  position: absolute;
  bottom: 300px;
  padding-bottom: 0%;
  padding-top:0%;
}
</style>