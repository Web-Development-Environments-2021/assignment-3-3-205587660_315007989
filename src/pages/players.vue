<template>
  <div>
    <figure class="snip1336">
  <img src='@/assets/testpic.jpg' >
  <figcaption>
    <img :src="Photo" alt="profile-sample4" class="profile" />
          <div :title="id" class="coach-title">
          <h4> Name:<b-link :to="{ name: 'players', params: { id: id } }">{{ this.FullName }}</b-link>
          <FavButton :id="id" Type="player"> </FavButton></h4> 
          <h4>Team Name:<b-link :to="{ name: 'Team', params: { id: team_id } }">{{ TeamName }}</b-link></h4> 
          <h4>Position: {{ Position }}</h4>
          <h4>birth date: {{ birth_date }}</h4>
          <h4>nationality: {{ nationality }}</h4>
          <h4>birthcountry: {{ birthcountry }}</h4>
          <h4>height: {{ height }}</h4>
          <h4>weight : {{ weight }}</h4>
          </div>

  </figcaption>
</figure>

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
      this.id = parseInt(data.player_id);
      this.FullName = data.name;
      this.TeamName = data.team_name;
      this.team_id = data.team_id;
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
        console.log(response.data)
        this.loadData(response.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
  @import '../assets/styles/Players.css';

.FavPlayer{
  align-items:flex-start;
}

</style>
