<template>
  <div>
    <figure class="snip1336">
      <img src="@/assets/testpic.jpg" />
      <figcaption>
        <img :src="Logo" alt="profile-sample4" class="profile" />
        <div :title="id" class="team-title">
          <h4>
            Team Name:
            <b-link :to="{ name: 'Team', params: { id: id } }">
              {{ TeamName }}</b-link
            >
            <FavButton :id="id" Type="team"> </FavButton>
          </h4>
          <h4>
            coach Name:
            <b-link :to="{ name: 'Coach', params: { id: coach_id } }">
              {{ coachName }}</b-link
            >
          </h4>
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

  name: "TeamPreview",
  props: {
    id: {
      type: Number,
      required: true,
    },
    TeamName: {
      type: String,
      required: true,
    },
    Logo: {
      type: String,
      required: true,
    },
    coachName: {
      type: String,
      required: true,
    },
    coach_id: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    console.log("team preview mounted");
  },
  methods: {
    handleHover(hovered) {
      this.isHovered = hovered;
    },
  },
};
</script>

<style>
  @import '../assets/styles/Players.css';
</style>
