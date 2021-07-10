<template>
  <div class="team-preview">
    <b-card>
      <b-card-img
        class="float-right"
        :src="Logo"
        rounded="circle"
        right
      ></b-card-img>

      <b-card-text>
        <div :title="id" class="team-title">
          <b>Team Id:</b> {{ id }}
          <FavButton :id="id" Type="team"> </FavButton>
        </div>
        <ul class="team-content">
          <li>Team Name: <b-link :to="{ name: 'Team', params: { id: id } }">
          {{ TeamName }}</b-link></li>
          <li>coach Name: <b-link :to="{ name: 'Coach', params: { id: coach_id } }">
          {{ coachName }}</b-link></li>
        </ul>
      </b-card-text>
    </b-card>
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
.team-preview {
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

.team-preview .team-title {
  text-align: left;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.team-preview .team-content {
  width: 100%;
  overflow: hidden;
}
</style>
