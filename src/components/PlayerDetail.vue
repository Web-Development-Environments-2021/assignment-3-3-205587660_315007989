<template>
  <div class="player-preview">
    <b-card>
      <b-card-img class="float-right" :src="Photo" img-left></b-card-img>

      <b-card-text>
        <div :title="id" class="player-title">
          <FavButton :id="id" Type="player"> </FavButton>
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
    </b-card>
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
