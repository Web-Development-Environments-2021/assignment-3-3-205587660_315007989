<template>
  <div class="Fav-Button">
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
</template>

<script>
export default {
  data() {
    return {
      isHovered: false,
      isLiked: false,
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
    console.log("player preview mounted");
    var url_get =`http://localhost:3000/homepage/favorite${this.Type}`;
    const response_get = await this.axios.get(url);
    if(this.Type==="match")
    if (response_get.data.find(element => element.id > 10))



  },
  methods: {
    async RemoveFav() {
      try {
        var url =`http://localhost:3000/homepage/favorite${this.Type}/${this.id}`;
        const response = await this.axios.delete(url,{},{});
        // this.$parent.players = this.$parent.players.filter(
        //   (obj) => obj.player_id !== this.id
        // );
        this.$root.toast(
          "Removed from favorites",
          `Removed this ${this.Type} from favorites `,
          "success"
        );
      } catch (err) {
        console.log(err);
        // if()
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
