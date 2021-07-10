<template>
  <b-modal
    id="add-game"
    title="Add Game"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <div class="container">
      <b-form @submit.prevent="onSubmit">
        <b-form-group
          id="input-gameDate"
          label-cols-sm="5"
          label="Choose date of the game:"
          label-for="gameDate"
        >
          <b-form-datepicker
            id="example-datepicker"
            v-model="form.gameDate"
            :state="validateState('gameDate')"
          >
          </b-form-datepicker>
          <b-form-invalid-feedback v-if="!$v.form.gameDate.required">
            Please choose a date for the game to take place
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-hometeam"
          label="Home Team"
          label-for="homeTeam"
          label-cols-sm="5"
        >
          <b-form-select
            v-model="form.homeTeam"
            :options="teams_options"
            :state="validateState('homeTeam')"
          ></b-form-select>
          <b-form-invalid-feedback v-if="!$v.form.homeTeam.required">
            Home Team type is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.awayTeam.notSame">
            Away Team and Home team should be diffrent.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-awayTeam"
          label="Away Team"
          label-for="awayTeam"
          label-cols-sm="5"
        >
          <b-form-select
            v-model="form.awayTeam"
            :options="teams_options"
            :state="validateState('awayTeam')"
          ></b-form-select>
          <b-form-invalid-feedback v-if="!$v.form.awayTeam.required">
            Away Team type is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.awayTeam.notSame">
            Away Team and Home team should be diffrent.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-referees"
          label="Referee:"
          label-for="Referee"
          label-cols-sm="5"
        >
          <b-form-select
            v-model="form.Referee"
            :options="Referre_options"
            :state="validateState('Referee')"
          ></b-form-select>
          <b-form-invalid-feedback v-if="!$v.form.Referee.required">
            Referre is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-stadium"
          label="Stadium:"
          label-for="stadium"
          label-cols-sm="5"
        >
          <b-form-select
            v-model="form.stadium"
            :options="stadium_options"
            :state="validateState('stadium')"
          ></b-form-select>
          <b-form-invalid-feedback v-if="!$v.form.stadium.required">
            Stadium is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-stage"
          label="Stage:"
          label-for="stage"
          label-cols-sm="5"
        >
          <b-form-select
            v-model="form.stage"
            :options="stage_options"
            :state="validateState('stage')"
          ></b-form-select>
          <b-form-invalid-feedback v-if="!$v.form.stage.required">
            Stage is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-eventTime"
          label-cols-sm="5"
          label="Game time:"
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
  </b-modal>
</template>

<script>
import { required, sameAs, not } from "vuelidate/lib/validators";

export default {
  name: "AddEventComp",
  data() {
    return {
      gameDate: null,

      teams: [],
      teams_options: [
        { value: null, text: "Please select a game", disabled: true },
      ],
      Referre_options: [
        { value: null, text: "Please select a referre", disabled: true },
      ],
      stadium_options: [
        { value: null, text: "Please select a stadium", disabled: true },
      ],
      stage_options: [
        { value: null, text: "Please select a stage", disabled: true },
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
        homeTeam: null,
        awayTeam: null,
        Referee: null,
        stadium: null,
        stage: null,
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
      Referee: {
        required,
      },
      stadium: {
        required,
      },
      stage: {
        required,
      },
      homeTeam: {
        required,
        notSame: not(sameAs("awayTeam")),
      },
      awayTeam: {
        required,
        notSame: not(sameAs("homeTeam")),
      },
      gameDate: {
        required,
      },
      eventTime: {
        required,
      },
    },
  },
  mounted() {
    this.updateTeams();
    this.updateReffere();
    this.updateStadium();
    this.updateStage();
  },
  methods: {
    async updateReffere() {
      const response = await this.axios.get(
        "http://localhost:3000/league/Referees/"
      );
      response.data.forEach((element) => {
        this.Referre_options.push({
          value: element,
          text: `Referees name: ${element}`,
        });
      });
    },
    async updateStadium() {
      const response = await this.axios.get(
        "http://localhost:3000/league/Stadiums/"
      );
      response.data.forEach((element) => {
        this.stadium_options.push({
          value: element,
          text: `Stadium name: ${element}`,
        });
      });
    },
    async updateStage() {
      const response = await this.axios.get(
        "http://localhost:3000/league/Stages/"
      );
      response.data.forEach((element) => {
        this.stage_options.push({
          value: element,
          text: `Stage name: ${element}`,
        });
      });
    },

    async updateTeams() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/league/Teams/"
        );
        this.teams = response.data;
        this.UpdateOptions();
      } catch (error) {
        console.log("error in update teams");
        console.log(error);
      }
    },
    async UpdateOptions() {
      this.teams.forEach((element) => {
        this.teams_options.push({
          value: element.TeamId,
          text: `Team name: ${element.Name}, Team id: ${element.TeamId}`,
        });
      });
    },

    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Sumbit() {
      try {
        var h = this.form.eventTime.replaceAll("-", "").substring(0, 4);
        console.log({
          gameDate: this.form.gameDate,
          homeTeam: this.form.homeTeam,
          awayTeam: this.form.awayTeam,
          referee: this.form.Referee,
          stageName: this.form.stage,
          stadium: this.form.stadium,
          hour: this.form.eventTime,
        });
        const response = await this.axios.post(
          `http://localhost:3000/gamechange/`,
          {
            gameDate: this.form.gameDate,
            homeTeam: this.form.homeTeam,
            awayTeam: this.form.awayTeam,
            referee: this.form.Referee,
            stageName: this.form.stage,
            stadium: this.form.stadium,
            hour: this.form.eventTime,
          }
        );
        const obj = {
          gameDate: this.form.gameDate,
          homeTeam: this.form.homeTeam,
          awayTeam: this.form.awayTeam,
          referee: this.form.Referee,
          stageName: this.form.stage,
          stadium: this.form.stadium,
          hour: this.form.eventTime,
        };
        console.log(response);
        this.$emit(`myEventName`, obj);

        if (response.status == 409 || response.status == "409") {
          this.form.submitError =
            " one of the teams all ready playing this day";
          return false;
        } else {
          this.$root.toast("Success", `A game added to the system `, "success");
          return true;
        }
      } catch (err) {
        console.log(err);
        this.form.submitError = " one of the teams all ready playing this day";
        return false;
      }
    },
    onChange(event) {
      // console.log(event.target.value);
      this.form.gameDate = this.old_games
        .find((element) => element.gameID == event)
        .gameDate.substring(0, 10);
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.onSubmit();
    },

    async onSubmit() {
      // console.log(this.$emit());
      this.$emit(`myEventName`);
      console.log("Submit method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        console.log("Error");
        return;
      }

      let res = await this.Sumbit();
      if (res)
        this.$nextTick(() => {
          this.$bvModal.hide("add-game");
        });
      else {
        this.$root.toast(
          "danger",
          `one of the teams allready playing this day `,
          "danger"
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
