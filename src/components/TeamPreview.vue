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
          <b-div v-b-hover="handleHover">
            <b-icon
              v-b-tooltip.hover
              title="Remove from Favorite"
              v-if="isHovered"
              icon="heart"
              @click="RemoveFav"
            ></b-icon>
            <b-icon v-else id="heart" icon="heart-fill"></b-icon
          ></b-div>
        </div>
        <ul class="team-content">
          <li>Team Name: {{ TeamName }}</li>
          <li>coach Name: {{ coachName }}</li>
        </ul>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
    data() {
    return {
      isHovered: false
    };
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
  },
  mounted() {
    console.log("team preview mounted");
  },
   mounted() {
    console.log("player preview mounted");
  },
  methods: {
    async RemoveFav() {
      try {
        // var url =`http://localhost:3000/homepage/favoriteteam/${this.id}`;
        // const response = await this.axios.delete(url,{},{});
        this.$parent.teams = this.$parent.teams.filter(
          obj => obj.team_id !== this.id
        );
        this.$root.toast(
          "Removed from favorites", `${this.TeamName} Removed from favorites `,
          "success"
        );
      } catch (err) {
        console.log(err);
        // if()
      }
    },
    handleHover(hovered) {
      this.isHovered = hovered;
    }
  }
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
