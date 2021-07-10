<template>
  <b-modal
    id="score-modal"
    title="Change Score"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <div class="container">
      <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
        <b-form-group
          id="input-gameID"
          label="Choosed Game:"
          label-for="gameID"
        >
          <b-form-select
            v-model="form.gameID"
            :options="old_games_options"
            :state="validateState('gameID')"

          ></b-form-select>
          <b-form-invalid-feedback v-if="!$v.form.gameID.required">
            Choose Game is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-homeScore"
          label-cols-sm="4"
          label="Home team score:"
          label-for="homeScore"
        >
          <b-form-input
            id="homeScore"
            v-model="$v.form.homeScore.$model"
            type="text"
            :state="validateState('homeScore')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.homeScore.required">
            Home Score is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.homeScore.length">
            Home score number should be between 0 and 15
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-awayScore"
          label-cols-sm="4"
          label="Home team score:"
          label-for="awayScore"
        >
          <b-form-input
            id="awayScore"
            v-model="$v.form.awayScore.$model"
            type="text"
            :state="validateState('awayScore')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.awayScore.required">
            Away Score is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.awayScore.length">
            Away Score number should be between 0 and 15
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
import { required, minValue, maxValue } from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      old_games: [],
      old_games_options: [
        { value: null, text: "Please select a game", disabled: true },
      ],

      form: {
        homeScore: "",
        awayScore: "",
        gameID: null,
      },
      errors: [],
      validated: false,
    };
  },
  validations: {
    form: {
      gameID: {
        required,
      },
      homeScore: {
        required,
        length: (u) => minValue(0)(u) && maxValue(15)(u),
      },
      awayScore: {
        required,
        length: (u) => minValue(0)(u) && maxValue(15)(u),
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
        const response = await this.axios.put(
          `http://localhost:3000/gamechange/${this.gameID}`,
          {
            homeScore: this.form.homeScore,
            awayScore: this.form.awayScore,
          }
        );
        // this.$router.push("/AddResult"); //TODO: CHAGNE IT
        this.$root.toast("Success", `Change the score of a game `, "success");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data;
      }
    },
    onSubmit() {
      console.log();
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Sumbit();
      this.$emit(
        `myEventName`,
        this.gameID,
        this.form.homeScore,
        this.form.awayScore
      );
      this.$nextTick(() => {
        this.$bvModal.hide("score-modal");
      });
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.onSubmit();
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
