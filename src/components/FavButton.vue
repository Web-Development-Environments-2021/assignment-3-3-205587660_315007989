<template>
  <div v-if="$root.store.username" class="Fav-Button">
    <div v-if="isLiked" v-b-hover="handleHover">
      <b-icon
        v-if="isHovered"
        v-b-tooltip.hover
        title="Remove from Favorite"
        icon="heart"
        @click="RemoveFav"
      >
      </b-icon>
      <b-icon v-else id="heart" icon="heart-fill"></b-icon>
    </div>
    <div v-else v-b-hover="handleHover">
      <b-icon
        v-if="isHovered"
        v-b-tooltip.hover
        title="add to Favorite"
        icon="heart-fill"
        @click="addFav"
      >
      </b-icon>
      <b-icon v-else id="heart" icon="heart"></b-icon>
    </div>
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
    const response_get = JSON.parse(sessionStorage.getItem("Fav" + this.Type));
    console.log("tet",this.Type);
    if (
      this.Type === "matches" &&
      response_get.find(
        (element) => element.gameID == this.id || element.game_id == this.id
      )
    ) {
      console.log("liked game");
      this.isLiked = true;
    } else if (
      this.Type === "team" &&
      response_get.find((element) => element.team_id == this.id)
    ) {
      this.isLiked = true;
    } else if (
      this.Type === "player" &&
      response_get.find((element) => element.player_id == this.id)
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
        if (this.Type == "matches") {
          const old_fav = JSON.parse(sessionStorage.getItem("Fav" + this.Type));
          const new_fav = old_fav.filter((elem) => elem.game_id != this.id);
          sessionStorage.setItem("Favmatches", JSON.stringify(new_fav));
        }
        if (this.Type == "player") {
          const old_fav = JSON.parse(sessionStorage.getItem("Fav" + this.Type));
          const new_fav = old_fav.filter((elem) => elem.player_id != this.id);
          sessionStorage.setItem("Favplayer", JSON.stringify(new_fav));
        } else {
          const old_fav = JSON.parse(sessionStorage.getItem("Fav" + this.Type));
          const new_fav = old_fav.filter((elem) => elem.team_id != this.id);
          sessionStorage.setItem("Favteam", JSON.stringify(new_fav));
        }
        this.isLiked = false;
      } catch (err) {
        console.log(err);
      }
    },
    async addFav() {
      try {
        let url = `http://localhost:3000/homepage/favorite${this.Type}/${this.id}`;
        const response = await this.axios.put(url);
        this.$root.toast(
          "added to favorites",
          `added this ${this.Type} to favorites `,
          "success"
        );
        url = `http://localhost:3000/homepage/favorite${this.Type}`;
        const response_update = await this.axios.get(url);
        sessionStorage.setItem(
          "Fav" + this.Type,
          JSON.stringify(response_update.data)
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
.Fav-Button {
  display: inline-block;
}
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
