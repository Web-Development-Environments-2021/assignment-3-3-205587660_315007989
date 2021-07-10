<template>
  <div class="container">
    <b-card img-height="200" img-width="200">
      <b-card-img
        id="photo"
        class="float-left"
        img-height="200"
        img-width="200"
        :src="Photo"
        img-left
      ></b-card-img>

      <b-card-text>
        <div :title="id" class="team-title">
          <b> Team Id:</b> {{ id }}
          <h1>{{ team_name }}</h1>
          <FavButton v-if="loaded" :key="id" :id="id" Type="team"> </FavButton>
          <ul class="team-content">
            <li>
              Coach Name:
              <b-link :to="{ name: 'Coach', params: { id: coach_id } }">
                {{ coach_name }}</b-link
              >
            </li>
          </ul>
        </div>
      </b-card-text>
    </b-card>
    <b-tabs content-class="mt-3">
      <b-tab title="Roster" active>
        <b-card-group deck>
          <div class="cont">
            <FavPlayerPreview
              v-for="p in players"
              :id="p.player_id"
              :FullName="p.name"
              :Photo="p.image"
              :Position="p.position"
              :key="p.player_id"
            >
            </FavPlayerPreview>
          </div>
        </b-card-group>
      </b-tab>
      <b-tab title="Up Coming Games">
        <div class="cont">
          <GamePreviewDetial
            v-for="g in new_games"
            :id="g.gameID"
            :referee="g.referee"
            :stadium="g.stadium"
            :stage="g.stage"
            :hostTeamID="g.homeTeam"
            :hostTeam="g.homeTeamName"
            :guestTeamID="g.awayTeam"
            :guestTeam="g.awayTeamName"
            :date="g.gameDate"
            :hour="g.hour"
            :key="g.gameID"
          ></GamePreviewDetial>
        </div>
      </b-tab>
      <b-tab title="Old Games">
        <div class="cont">
          <GamePreviewDetial
            v-for="g in old_games"
            :id="g.gameID"
            :referee="g.referee"
            :stadium="g.stadium"
            :awayScore="g.awayScore"
            :homeScore="g.homeScore"
            :stage="g.stage"
            :hostTeamID="g.homeTeam"
            :hostTeam="g.homeTeamName"
            :guestTeamID="g.awayTeam"
            :guestTeam="g.awayTeamName"
            :date="g.gameDate"
            :hour="g.hour"
            :key="g.gameID"
          ></GamePreviewDetial></div
      ></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import FavPlayerPreview from "../components/FavPlayerPreview.vue";
import FavButton from "../components/FavButton.vue";
import GamePreviewDetial from "../components/GamePreviewDetial.vue";

export default {
  name: "FavPlayerPreview",
  components: {
    FavPlayerPreview,
    GamePreviewDetial,
    FavButton,
  },
  data() {
    return {
      players: [],
      old_games: [],
      new_games: [],
      isHovered: false,
      id: "",
      team_name: "",
      Photo: "",
      coach_id: "",
      coach_name: "",
      trophies: "",
      loaded: false,
    };
  },
  name: "TeamDetial",
  mounted() {
    this.getTeam();
    this.loaded=true;
  },
  methods: {
    loadData(data) {
      this.id =parseInt( data.team_id);
      this.team_name = data.team_name;
      this.Photo = data.logo_path;
      this.coach_id = data.coach_id;
      this.coach_name = data.coach_name;
      this.trophies = data.trophies;
      this.players = data.players;
    },

    async getTeam() {
      try {
        const team_id = this.$route.params.id;
        console.log(`team ID number ${team_id}`);
        const url = `http://localhost:3000/teams/teamFullDetails/${team_id}`;
        const response = await this.axios.get(url);
        this.loadData(response.data);
        this.filterGames(response.data.games);
      } catch (err) {
        console.log(err);
      }
    },

    async filterGames(games) {
      console.log(games);
      var today = new Date();
      today = today.toISOString();
      games.forEach((game) => {
        if (game.gameDate < today) {
          this.old_games.push(game);
        } else {
          this.new_games.push(game);
        }
      });
      this.new_games.sort((a,b) => (a.gameDate > b.gameDate) ? 1 : ((b.gameDate > a.gameDate) ? -1 : 0))
      this.old_games.sort((a,b) => (a.gameDate > b.gameDate) ? 1 : ((b.gameDate > a.gameDate) ? -1 : 0))

    },
  },
};
</script>

<style>
.cont {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}


.team-preview {
  display: inline-block;
  width: 100%;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue;
}

.team-preview .team-title {
  text-align: left;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.team-preview .team-content {
  width: 100%;
  overflow: hidden;
}

#photo {
  width: 200px !important;
  height: 200px !important;
}
</style>
