<template>
  <div class="container">
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >Login</b-button
      >
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>

    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined,
      },
    };
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {

    // async SetInMemory() {
    //   let favTeamsP = this.axios.get(
    //     "http://localhost:3000/homepage/favoriteteam"
    //   );
    //   let favPlayersP = this.axios.get(
    //     "http://localhost:3000/homepage/favoriteplayer"
    //   );
    //   let favGamesP = this.axios.get(
    //     "http://localhost:3000/homepage/favoritematches"
    //   );
    //   await Promise.all([favTeamsP, favPlayersP, favGamesP]).then((values) => {
    //     sessionStorage.setItem("Favteam", JSON.stringify(values[0].data));
    //     sessionStorage.setItem("Favplayer", JSON.stringify(values[1].data));
    //     sessionStorage.setItem("Favmatches", JSON.stringify(values[2].data));
    //   });
    // },
    async SetInMemory() {
            let favGamesP = await this.axios.get(
        "http://localhost:3000/homepage/favoritematches"
      );
      sessionStorage.setItem("Favmatches", JSON.stringify(favGamesP.data));

      let favTeamsP = await this.axios.get(
        "http://localhost:3000/homepage/favoriteteam"
      );
      sessionStorage.setItem("Favteam", JSON.stringify(favTeamsP.data));

      let favPlayersP = await this.axios.get(
        "http://localhost:3000/homepage/favoriteplayer"
      );
      sessionStorage.setItem("Favplayer", JSON.stringify(favPlayersP.data));


    },

    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const response = await this.axios.post("http://localhost:3000/Login", {
          username: this.form.username,
          password: this.form.password,
        });
        // console.log(response);
        // this.$root.loggedIn = true;
        console.log(this.$root.store.login);
        this.$root.store.login(this.form.username);
        this.SetInMemory().then((va)=>{
        console.log(sessionStorage);
        this.$emit("forceRerender");
              this.$forceUpdate();
        this.$router.push("/");
        });

      } catch (err) {
        console.log(err.response);
        if (err.response.status === 401) {
          this.form.submitError = err.response.data;
          //     console.log(this.form.submitError);
        }
        //      this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      this.$emit('myCustomEvent')

      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");
      this.Login();
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
