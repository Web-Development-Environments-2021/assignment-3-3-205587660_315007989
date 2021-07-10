<template>
  <div class="GameEvent">
    <ul class="game-content">
      <li v-for="event in Events" :key="event.inGameMinute">
        {{ event }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Events: [],
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

        let eventes = response_get.data;
                console.log(this.eventes)

        eventes = eventes.sort((a, b) =>
          a.inGameMinute > b.inGameMinute
            ? 1
            : b.inGameMinute > a.inGameMinute
            ? -1
            : 0
        );

        console.log(eventes);
        eventes.forEach((elem) => {
          let gamedate =
            elem.gameDate.substring(0, 4) +
            "/" +
            elem.gameDate.substring(4, 6) +
            "/" +
            elem.gameDate.substring(6, 8);
          let gametime = elem.gameTime.split(":");
          if (gametime[0].length < 2) {
            gametime[0] = "0" + gametime[0];
          }
          if (gametime[1].length < 2) {
            gametime[1] = gametime[1] + "0";
          }

          gametime = gametime[0] + ":" + gametime[1];
          let s = `${gamedate} ${gametime} ${elem.inGameMinute} minutes in game, ${elem.eventType},${elem.eventDescription}  `;
          this.Events.push(s);
        });
        // this.Events = eventes;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getEvents();
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
