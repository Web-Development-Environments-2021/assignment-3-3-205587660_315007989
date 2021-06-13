<template>
  <div class="team-preview">
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
          <!-- <b-div v-b-hover="handleHover">
            <b-icon
              v-b-tooltip.hover
              title="Remove from Favorite"
              v-if="isHovered"
              icon="heart"
              @click="RemoveFav"
            >
            </b-icon>
            <b-icon v-else id="heart" icon="heart-fill"></b-icon
          ></b-div> -->
          <h1>{{ TeamName }}</h1>
          <!-- <h3>{{ FullName }}</h3> -->
        </div>
        <ul class="team-content">
          <li>Coach Name: {{ coach_name }}</li>
        </ul>
        <b-card-group deck>
          <PlayerPreview
            v-for="p in players"
            :id="p.player_id"
            :FullName="p.name"
            :Photo="p.image"
            :Position="p.position"
            :key="p.player_id"
          >
          </PlayerPreview>
        </b-card-group>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import PlayerPreview from "../components/PlayerPreview.vue";
export default {
  name: "PlayerPreview",
  components: {
    PlayerPreview,
  },
  data() {
    return {
      players: [],
      isHovered: false,
    };
  },
  name: "TeamDetial",
  props: {
    id: {
      type: Number,
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
  },
  mounted() {
    this.getTeam();
  },
  methods: {
    async RemoveFav() {
      try {
        // var url =`http://localhost:3000/homepage/favoriteteam/${this.id}`;
        // const response = await this.axios.delete(url,{},{});
        this.$parent.teams = this.$parent.teams.filter(
          (obj) => obj.team_id !== this.id
        );
        this.$root.toast(
          "Removed from favorites",
          `${this.FullName} Removed from favorites `,
          "success"
        );
      } catch (err) {
        console.log(err);
      }
    },
    handleHover(hovered) {
      this.isHovered = hovered;
    },

    loadData(data) {
      this.id = data.team_id;
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
