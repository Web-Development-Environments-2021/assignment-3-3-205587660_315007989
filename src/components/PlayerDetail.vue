<template>
  <div class="player-preview">
    <b-card>
      <b-card-img class="float-right" :src="Photo" img-left></b-card-img>

      <b-card-text>
        <div :title="id" class="player-title">
          <b> Player Id:</b> {{ id }}
          <b-div v-b-hover="handleHover">
            <b-icon
              v-b-tooltip.hover
              title="Remove from Favorite"
              v-if="isHovered"
              icon="heart"
              @click="RemoveFav"
            >
            </b-icon>
            <b-icon v-else id="heart" icon="heart-fill"></b-icon
          ></b-div>
          <h1>{{ TeamName }} | #{{ Position }}</h1>
          <h2>{{ FullName }}</h2>
        </div>
        <ul class="player-content">
          <li>Full Name: {{ FullName }}</li>
          <li>Team Name: {{ TeamName }}</li>
          <li>Position: {{ Position }}</li>
        </ul>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHovered: false,
    };
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
    Photo: {
      type: String,
      required: true,
    },
    Position: {
      type: String,
      required: true,
    },
    // CommonName: {},
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
  mounted() {
    this.getPlayer();
  },
  methods: {
    async RemoveFav() {
      try {
        // var url =`http://localhost:3000/homepage/favoriteplayer/${this.id}`;
        // const response = await this.axios.delete(url,{},{});
        this.$parent.players = this.$parent.players.filter(
          (obj) => obj.player_id !== this.id
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
    async getPlayer() {
      try {
        console.log(`player ID number ${$route.params.id}`);
        const url= `http://localhost:3000/homepage/player/playerFullDetails/${2}`
        const response = await this.axios.get();

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
