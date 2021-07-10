<template>
  <div class="league-preview">
    <figure class="snip1336">
      <img src="@/assets/superliga.png" />
      <figcaption>
        <img
          src="@/assets/Screenshot_1.png"
          alt="profile-sample4"
          class="profile"
        />
        <h5>Season ID: {{ CurrentSeasonID }}</h5>
        <h5>Stage: {{ Stage }}</h5>
        <h3 id="mainNextGame">Upcoming Game</h3>
        <h5>GameDate:{{ GameDate }}</h5>
        <h5>Hour:{{ Hour }}</h5>
        <h5>Host:{{ hostTeam }}</h5>
        <h5>Guest:{{ guestTeam }}</h5>
        <h5>Stadium:{{ stadium }}</h5>
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
      referee: "",
      stadium: "",
      hostTeam: "",
      guestTeam: "",
      GameDate: "",
      Hour: "",
    };
  },
  methods: {
    async getStage() {
      try {
        var response = [];
        response = await this.axios.get(
          `http://localhost:3000/game/getClosestGame`
        );
        if (response) {
          console.log(123);
          console.log(response.data);
          this.Stage = response.data[0].stage;
          this.Hour = response.data[0].hour.substring(11,16);
          this.GameDate = response.data[0].gameDate.substring(0,10);
          this.hostTeam = response.data[0].homeTeamName;
          this.guestTeam = response.data[0].awayTeamName;
          this.stadium = response.data[0].stadium;
          this.referee = response.data[0].referee;
          console.log(this);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async GetClosestGame() {
      try {
        var response = [];
        response = await this.axios.get(
          `http://localhost:3000/game/getClosestGame`
        );
        if (response) {
          console.log(123);
          console.log(response.data);
          this.Stage = response.data[0].stage;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    console.log("get league details mounted");
    this.getStage();
    console.log(1234);
  },
};
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
  color: rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}
#mainNextGame {
  text-decoration: underline;
  text-align: center;
  margin-top: 10px;
}
</style>