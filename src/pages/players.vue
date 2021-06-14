<template>
  <div class="player-preview">
    <b-card>
      <b-card-img class="float-right" :src="Photo" img-left></b-card-img>

      <b-card-text>
        <div :title="id" class="player-title">
          <b> Player Id:</b> {{ id }}
          <FavButton :id="id" Type="player"> </FavButton>
          <h1>{{ TeamName }} | #{{ Position }}</h1>
          <h3>{{ FullName }}</h3>
        </div>

        <ul class="player-content">
          <li>Full Name: {{ FullName }}</li>
          <li>        Team Name:        <b-link :to="{ name: 'Team', params: { id: team_id } }">
          {{ TeamName }}</b-link></li>
          <li>Position: {{ Position }}</li>
          <li>birth_date: {{ birth_date }}</li>
          <li>nationality: {{ nationality }}</li>
          <li>birthcountr: {{ birthcountr }}</li>
          <li>height: {{ height }}</li>
          <li>weight : {{ weight }}</li>
        </ul>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import FavButton from "../components/FavButton.vue";

export default {
  data() {
    return {
            isHovered: false,
      id:"",
      FullName:"",
      TeamName:"",
      team_id: "",
      Photo: "",
      Position: "",
      nationality: "",
      birth_date: "",
      birthcountry: "",
      height: "",
      weight: "",
    };
  },
    components: {
    FavButton,
  },
  name: "PlayerDetial",
  mounted() {
    this.getPlayer();
  },
  methods: {
    handleHover(hovered) {
      this.isHovered = hovered;
    },

    loadData(data) {
      this.FullName = data.name;
      this.id = data.player_id;
      this.FullName = data.name;
      this.TeamName = data.team_name;
      this.Team_id = data.team_id;
      this.Photo = data.image;
      this.Position = data.position;
      this.nationality = data.nationality;
      this.birth_date = data.birth_date;
      this.birthcountry = data.birthcountry;
      this.height = data.height;
      this.weight = data.weight;
    },

    async getPlayer() {
      try {
        const player_id = this.$route.params.id;
        console.log(`player ID number ${player_id}`);
        const url = `http://localhost:3000/player/playerFullDetails/${player_id}`;
        const response = await this.axios.get(url);
        console.log(response);
        console.log(response.data.name);
        // this.FullName=response.data.name
        console.log(this);
        this.loadData(response.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
.player-preview {
  display: inline-block;
  width: 500px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue;
}

.player-preview .player-title {
  text-align: left;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.player-preview .player-content {
  width: 100%;
  overflow: hidden;
}
</style>
