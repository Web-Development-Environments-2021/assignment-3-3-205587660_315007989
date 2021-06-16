<template>
  <div class="container">
    <h1 class="title">Add new game</h1>
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-gameID"
        label-cols-sm="4"
        label="Choosed Game:"
        label-for="gameID"
      >
        <b-form-select
          v-model="form.gameID"
          @change="onChange($event)"
          :options="old_games_options"
          :state="validateState('gameID')"
        ></b-form-select>
        <b-form-invalid-feedback v-if="!$v.form.gameID.required">
          Please choose a game
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-gameDate"
        label-cols-sm="4"
        label="Game Date:"
        label-for="gameDate"
      >
        <b-form-input
          id="gameDate"
          v-model="form.gameDate"
          type="text"
          disabled
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-eventType"
        label="Event type"
        label-for="eventType"
      >
        <b-form-select
          v-model="form.eventType"
          :options="event_type_options"
          :state="validateState('eventType')"
        ></b-form-select>
        <b-form-invalid-feedback v-if="!$v.form.eventType.required">
          Event type is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-inGameMinute"
        label-cols-sm="4"
        label="In game minute:"
        label-for="inGameMinute"
      >
        <b-form-input
          id="inGameMinute"
          v-model="$v.form.inGameMinute.$model"
          type="text"
          :state="validateState('inGameMinute')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.inGameMinute.required">
          In game time is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.inGameMinute.length">
          In game time should be between 0 and 120
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-eventTime"
        label-cols-sm="4"
        label="Event time:"
        label-for="eventTime"
      >
        <b-form-timepicker
          id="eventTime"
          v-model="$v.form.eventTime.$model"
          type="text"
          :state="validateState('eventTime')"
        ></b-form-timepicker>
        <b-form-invalid-feedback v-if="!$v.form.eventTime.required">
          Event time is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-EventDescription"
        label-cols-sm="4"
        label="EventDescription:"
        label-for="EventDescription"
      >
        <b-form-textarea
          id="EventDescription"
          v-model="$v.form.EventDescription.$model"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
          :state="validateState('EventDescription')"
        ></b-form-textarea>
      </b-form-group>
      <b-form-invalid-feedback v-if="!$v.form.EventDescription.required">
        Description is required
      </b-form-invalid-feedback>
      <b-form-invalid-feedback v-else-if="$v.form.EventDescription.length">
        Description should be at least 1 character
      </b-form-invalid-feedback>

      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Submit</b-button
      >
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import {
  required,
  minValue,
  maxValue,
  minLength,
} from "vuelidate/lib/validators";

export default {
  name: "AddEventComp",
  data() {
    return {
      gameDate: null,

      old_games: [],
      old_games_options: [
        { value: null, text: "Please select a game", disabled: true },
      ],
      event_type_options: [
        { value: null, text: " Please select event ", disabled: true },
        { value: "Goal", text: " goal event " },
        { value: "Yellow card", text: " yellow card event " },
        { value: "Red card", text: " red card event " },
        { value: "Offside", text: " offside event " },
        { value: "Injury", text: " injury event " },
        { value: "Player switch", text: "player switch event" },
      ],
      form: {
        gameID: null,

        gameDate: "",
        inGameMinute: "",
        eventType: null,
        eventTime: "",
        EventDescription: "",
      },
      errors: [],
      validated: false,
    };
  },
  validations: {
    form: {
      inGameMinute: {
        required,
        length: (u) => minValue(0)(u) && maxValue(120)(u),
      },
      EventDescription: {
        required,
      },
      eventTime: {
        required,
      },
      eventType: {
        required,
      },
      gameID: {
        required,
      },

      gameDate: {
        required,
      },
    },
  },
  mounted() {
    this.updateGames();
  },
  methods: {
    async updateGames() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/game/allGames/"
        );
        var today = new Date();
        today = today.toISOString();
        this.old_games = response.data.filter((game) => game.gameDate < today);
        this.UpdateOptions();
      } catch (error) {
        console.log("error in update teams");
        console.log(error);
      }
    },
    async UpdateOptions() {
      this.old_games.forEach((element) => {
        this.old_games_options.push({
          value: element.gameID,
          text: `gameid:${element.gameID}, ${element.homeTeamName} vs ${
            element.awayTeamName
          }, game date:${element.gameDate.substring(0, 10)}  `,
        });
      });
    },

    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Sumbit() {
      try {
        

        console.log({
          gameId: this.form.gameID,
          eventType: this.form.eventType,
          gameDate: this.form.gameDate.replaceAll('-',''),
          gameTime: this.form.eventTime,
          inGameMinute: this.form.inGameMinute,
          eventDescription: this.form.EventDescription,
        });
        const response = await this.axios.post(
          `http://localhost:3000/gamechange/${this.form.gameID}/events`,
          {
         gameId: this.form.gameID,
          eventType: this.form.eventType,
          gameDate: this.form.gameDate.replaceAll('-',''),
          gameTime: this.form.eventTime,
          inGameMinute: this.form.inGameMinute,
          eventDescription: this.form.EventDescription,
          }
        );
        // this.$router.push("/AddResult"); //TODO: CHAGNE IT
        // response.status()
        this.$root.toast("Success", `Change the score of a game `, "success");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data;
      }
    },
    onChange(event) {
      // console.log(event.target.value);
      this.form.gameDate = this.old_games
        .find((element) => element.gameID == event)
        .gameDate.substring(0, 10);
    },
    onSubmit() {
      console.log("Submit method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        console.log("Error");
        return;
      }
      console.log("register method go");
      this.Sumbit();
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
