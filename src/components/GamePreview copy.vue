<template>
  <div class="game-preview">
    <div :title="id" class="game-title">
      <b>Game Id:</b> {{ id }}
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
    <ul class="game-content">
      <li> host: {{ hostTeam }}</li>
      <li> guest: {{ guestTeam }}</li>
      <li> date: {{ date }}</li>
      <li> time: {{ hour }}</li>
    </ul>
  </div>
</template>

<script>
export default {
    data() {
    return {
      isHovered: false
    };
  },
  name: "GamePreview",
  props: {
      id: {
        type: Number,
        required: true
      },
      hostTeam: {
        type: String,
        required: true
      },
      guestTeam: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      hour: {
        type: String,
        required: true
      }
  }, 
  mounted(){
    console.log("game preview mounted")
  },
  
  methods: {
    async RemoveFav() {
      try {
        // var url =`http://localhost:3000/homepage/favoritematches/${this.id}`;
        // const response = await this.axios.delete(url,{},{});
        this.$parent.games = this.$parent.games.filter(
          obj => obj.game_id !== this.id
        );
        this.$root.toast(
          "Removed from favorites", `${this.id} game Removed from favorites `,
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
.game-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}



</style>
