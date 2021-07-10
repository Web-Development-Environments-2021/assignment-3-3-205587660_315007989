<template>
  <div id="favCont">
    <figure class="snip1336">
      <img src="@/assets/testpic.jpg" />
      <figcaption>
        <img :src="Photo" alt="profile-sample4" class="profile" />
        <div :title="id" class="coach-title">
          <h4>
            Name:<b-link :to="{ name: 'players', params: { id: id } }">{{
              this.FullName
            }}</b-link>
            <FavButton :id="id" Type="player"> </FavButton>
          </h4>

          <!-- <h4> Player ID:{{ this.id }}</h4>  -->
          <h4>
            Team Name:<b-link :to="{ name: 'Team', params: { id: team_id } }">{{
              TeamName
            }}</b-link>
          </h4>
          <h4>Position: {{ Position }}</h4>
        </div>
      </figcaption>
    </figure>

  </div>
</template>

<script>
import FavButton from "./FavButton.vue";

export default {
  data() {
    return {
      isHovered: false,
    };
  },
  components: {
    FavButton,
  },

  name: "PlayerPreview",
  props: {
    id: {
      type: Number,
      required: true,
    },
    team_id: {
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
    Photo: {
      type: String,
      required: true,
    },
    Position: {
      type: String,
      required: true,
    },
  },
  mounted() {
    console.log("player preview mounted");
  },
};
</script>

<style scoped>
  @import '../assets/styles/Players.css';

</style>
