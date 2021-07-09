<template>
  <div class="GameEvent">
    <ul class="game-content">
      <b-div v-for="event in Events"
    :key="event.inGameMinute"
>
        {{ event }}
      </b-div>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Events: []
    };
  },

  name: "GamePreview",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async getEvents() {
      try {
        let url_get = `http://localhost:3000/game/${this.id}/events/`;
        const response_get = await this.axios.get(url_get);
        this.Event = response_get.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    getEvents();
    console.log("game preview mounted");
  },
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
  border-color: cadetblue;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}
</style>
// eventType // gameDate // gameTime // inGameMinute // eventDescription
