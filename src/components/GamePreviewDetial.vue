<template>
  <div class="game-preview">
    <div :title="id" class="game-title">
      <b>Game Id:</b> {{ id }}

      <FavButton v-if="!isPast" :id="id" Type="matches"> </FavButton>
    </div>
    <ul class="game-content">
      <li>
        host:
        <b-link :to="{ name: 'Team', params: { id: hostTeamID } }">
          {{ hostTeam }}</b-link
        >
      </li>
      <li>
        guest:
        <b-link :to="{ name: 'Team', params: { id: guestTeamID } }">
          {{ guestTeam }}</b-link
        >
      </li>
      <li v-if="isPast">score: {{ homeScore }}:{{ awayScore }}</li>
      <li>referee: {{ referee }}</li>
      <li>stadium: {{ stadium }}</li>
      <li>stage: {{ stage }}</li>
      <li>date:  {{datePrint}}</li>
      <li>time: {{ timePrint }}</li>
    </ul>
    <div v-if="isPast">
      <GameEvent
      :id="id"
      ></GameEvent>
    </div>
  </div>
</template>

<script>
import FavButton from "./FavButton.vue";
import GameEvent from "./GameEvent.vue";
export default {
  data() {
    return {
      Events: [],
      isPast: true,
      datePrint: "1",
      timePrint: "2",
    };
  },

  name: "GamePreviewDetial",
  props: {
    id: {
      type: Number,
      required: true,
    },
    hostTeamID: {
      type: Number,
      required: true,
    },
    guestTeamID: {
      type: Number,
      required: true,
    },
    hostTeam: {
      type: String,
      required: true,
    },
    guestTeam: {
      type: String,
      required: true,
    },
    stadium: {
      type: String,
      required: true,
    },
    referee: {
      type: String,
      required: true,
    },
    homeScore: {
      type: Number,
      required: true,
    },
    awayScore: {
      type: Number,
      required: true,
    },
    stage: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
  },
  components: {
    FavButton,
    GameEvent,
  },
  methods: {
    async setIsPast() {
      var today = new Date();
      today = today.toISOString();
      console.log(this);
      this.isPast = this.date < today;
      this.datePrint=this.date.substring(0, 10);
      this.timePrint=this.hour.substring(11, 16);
    },
    async getEvents() {
      try {
        if (this.isPast) {
          var url_get = `http://localhost:3000/game/${this.id}/events/`;
          const response_get = await this.axios.get(url_get);
          console.log(response_get);
          this.Events = response_get.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    console.log("game preview mounted");
    this.setIsPast();
    this.getEvents();
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
