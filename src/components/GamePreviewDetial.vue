<template>
  <div id="favCont">
    <figure class="snip1336">
      <img src="@/assets/testpic.jpg" />
      <figcaption>
        <img
          src="@/assets/football.png"
          alt="profile-sample4"
          class="profile"
        />
        <div :title="id" class="coach-title">
          <h5>
            host:
            <b-link :to="{ name: 'Team', params: { id: hostTeamID } }">{{
              hostTeam
            }}</b-link>
            <FavButton v-if="!isPast" :id="id" Type="matches"> </FavButton>
          </h5>
          <h5>
            guest:
            <b-link :to="{ name: 'Team', params: { id: guestTeamID } }">
              {{ guestTeam }}</b-link
            >
          </h5>

          <h5 v-if="isPast">score: {{ homeScore }}:{{ awayScore }}</h5>
          <h5>referee: {{ referee }}</h5>
          <h5>stadium: {{ stadium }}</h5>
          <h5>stage: {{ stage }}</h5>
          <h5>date: {{ datePrint }}</h5>
          <h5>time: {{ timePrint }}</h5>
          <b-button v-if="isPast" v-b-modal="infoModal.id">Show Modal</b-button>
          <b-modal :id="infoModal.id" title="Game Event">
            <GameEvent v-if="isPast" :id="game_id"></GameEvent>
          </b-modal>
        </div>
      </figcaption>
    </figure>
  </div>
</template>

<script>
import FavButton from "./FavButton.vue";
import GameEvent from "./GameEvent.vue";
export default {
  data() {
    return {
      Events: [],
      game_id: "",
      isPast: true,
      datePrint: "",
      timePrint: "",
      infoModal: {
        id: `info-modal${this.id}`,
        title: "",
        content: "",
      },
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
      this.datePrint = this.date.substring(0, 10);
      this.timePrint = this.hour.substring(11, 16);
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
    this.game_id = this.id;
    this.setIsPast();
    this.getEvents();
  },
};
</script>

<style>
@import "../assets/styles/Players.css";
</style>
