<template>
  <div>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group
        id="fieldset-1"
        label="Choosed Game:"
        label-for="input-1"
      >
        <b-form-select
          v-model="selected"
          :options="old_games_options"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-email"
       label-cols-sm="3" 
       label="email:" 
       label-for="email"
       >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="email"
          :state="validateState('email')"
        />
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          Email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.email.email">
          Email must be valid
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Register</b-button
      >
    </b-form>
  </div>
</template>

<script>

export default {
  name: "AddResultWindow",

  data() {
    return {
      selected: null,
      homeScore: 0,
      old_games: [],
      old_games_options: [
        { value: null, text: "Please select a game", disabled: true },
      ],
    };
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
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
