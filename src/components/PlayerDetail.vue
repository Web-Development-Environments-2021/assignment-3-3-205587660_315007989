<template>
  <div class="player-preview">

  <figure class="snip1336">
  <img src='@/assets/testpic.jpg' >
  <figcaption>
    <img :src="Photo" alt="profile-sample4" class="profile" />
          <div :title="id" class="coach-title">
          <h4> Name:<b-link :to="{ name: 'players', params: { id: id } }">{{ this.FullName }}</b-link>
          <FavButton :id="id" Type="player"> </FavButton></h4> 
          
          <!-- <h4> Player ID:{{ this.id }}</h4>  -->
           <h4>Team Name:<b-link :to="{ name: 'Team', params: { id: team_id } }">{{ TeamName }}</b-link></h4> 
          <h4>Position: {{ Position }}</h4>
          </div>

  </figcaption>
</figure>


    <!-- <b-card>
      <b-card-img class="float-right" :src="Photo" img-left></b-card-img>

      <b-card-text>
        <div :title="id" class="player-title">
          <FavButton :id="parseInt(id)" Type="player"> </FavButton>
          <h1>{{ TeamName }} | #{{ Position }}</h1>
          <h2>{{ FullName }}</h2>
        </div>
        <ul class="player-content">
          <li>Full Name: {{ FullName }}</li>
          <li>Team Name: <b-link :to="{ name: 'Team', params: { id: team_id } }">
          {{ TeamName }}</b-link
        ></li>
          <li>Position: {{ Position }}</li>
        </ul>
      </b-card-text>
    </b-card> -->
  </div>
</template>

<script>
import FavButton from "./FavButton.vue";

export default {
  data() {
    return {};
  },
  components: {
    FavButton,
  },
  name: "PlayerDetial",
  props: {
    id: {
      type: Number,
      required: true,
    },
    FullName: {
      type: String,
      required: true,
    },
    TeamName: {
      type: String,
      required: true,
    },
        team_id: {
      type: Number,
      required: true,
    },

    Photo: {
      type: String,
      required: true,
    },
    Position: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    birth_date: {
      type: String,
      required: true,
    },
    birthcountry: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
  },

};
</script>

<style scoped>
  @import '../assets/styles/Players.css';

</style>