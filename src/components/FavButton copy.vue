<template>
  <div class="Fav-Button">
    <b-div v-if="isLiked" v-b-hover="handleHover">
      <b-icon
        v-if="isHovered"
        v-b-tooltip.hover
        title="Remove from Favorite"
        icon="heart"
        @click="RemoveFav"
      >
      </b-icon>
      <b-icon v-else id="heart" icon="heart-fill"></b-icon>
    </b-div>
    <b-div v-else v-b-hover="handleHover">
      <b-icon
        v-if="isHovered"
        v-b-tooltip.hover
        title="add to Favorite"
        icon="heart-fill"
        @click="addFav"
      >
      </b-icon>
      <b-icon v-else id="heart" icon="heart"></b-icon>
    </b-div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHovered: false,
      isLiked: true,
    };
  },
  name: "FavButton",
  props: {
    id: {
      type: Number,
      required: true,
    },
    Type: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    var url_get = `http://localhost:3000/homepage/favorite${this.Type}`;
    const response_get = await this.axios.get(url_get);
    if (
      this.Type === "matches" &&
      response_get.data.find((element) => element.game_id == this.id)
    ) {
      console.log("liked game");
      this.isLiked = true;
    } else if (
      this.Type === "team" &&
      response_get.data.find((element) => element.team_id == this.id)
    ) {
      this.isLiked = true;
    } else if (
      this.Type === "player" &&
     response_get.data.find((element) => element.player_id == this.id)
    ) {
      this.isLiked = true;
    } else {
      this.isLiked = false;
    }
  },
  methods: {
    async RemoveFav() {
      try {
        var url = `http://localhost:3000/homepage/favorite${this.Type}/${this.id}`;
        const response = await this.axios.delete(url);
        this.$root.toast(
          "Removed from favorites",
          `Removed this ${this.Type} from favorites `,
          "success"
        );
        this.isLiked = false;
      } catch (err) {
        console.log(err);
      }
    },
    async addFav() {
      try {
        var url = `http://localhost:3000/homepage/favorite${this.Type}/${this.id}`;
        const response = await this.axios.put(url);
        this.$root.toast(
          "added to favorites",
          `added this ${this.Type} to favorites `,
          "success"
        );
        this.isLiked = true;
      } catch (err) {
        console.log(err);
      }
    },
    handleHover(hovered) {
      this.isHovered = hovered;
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
