<template>
    <div class="league-preview">
      <!-- <b-card
      img-alt="Image"
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    > -->
      <!-- <b-card-title>{{leagueName}}</b-card-title> -->
      <!-- <img src="@/assets/SuperLiga_logo.png" /> -->

      <!-- <img src="@/assets/superliga.png" />

      <b-card-text>
        Season: {{ CurrentSeasonID }}
        <br/>
        Stage: {{ Stage }}
      </b-card-text>
    </b-card>
  </div> -->

  <figure class="snip1336">
  <img src='@/assets/superliga.png' >
  <figcaption>
    <img src='@/assets/Screenshot_1.png' alt="profile-sample4" class="profile" />
          <h5>Season ID: {{ CurrentSeasonID }} </h5>
          <h5>Stage: {{ Stage }}</h5>
  </figcaption>
</figure>
    </div>
</template>

<script>
export default {
 data() {
    return {
      leagueName: "SuperLiga", 
      CurrentSeasonID: "18334", 
      Stage: "",
      Date:"",
      Hour:"",
      stadium:"",
      guestTeam:"",
      hostTeam:"",
    };
  },methods:{
    async getStage(){
        try {
          var response=[]
      response = await this.axios.get(`http://localhost:3000/game/getClosestGame`);
              if (response){
                console.log(123);
                console.log(response.data);
          this.Stage=response.data[0].stage
          this.Date=response.data[0].gameDate
          this.stadium=response.data[0].stadium
          this.Hour=response.data[0].Hour
          this.hostTeam=response.data[0].homeTeamName
          this.guestTeam=reponse.data[0].awayTeamName
        }
        }

        catch(err)
        {
          console.log(err);
        }

    },
        async GetClosestGame(){
        try {
          var response=[]
      response = await this.axios.get(`http://localhost:3000/game/getClosestGame`);
              if (response){
                console.log(123);
                console.log(response.data);
          this.Stage=response.data[0].stage
        }
        }

        catch(err)
        {
          console.log(err);
        }

    },
    },
      mounted() {
    console.log("get league details mounted");
    this.getStage();
    console.log(1234);
  },

  }

</script>

<style>
/* .league-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(44, 89, 116);
} */

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}

</style>