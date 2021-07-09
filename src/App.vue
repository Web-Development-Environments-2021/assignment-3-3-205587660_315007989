<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'main' }">Superliga Vue</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
          <b-nav-item :to="{ name: 'LeagueGames' }">LeagueGames</b-nav-item>
          <!-- <div v-if="localStorage.getItem('username') &&localStorage.getItem('username')==admin"> -->
          <div v-if="$root.store.username=='admin'">
          <b-nav-item  :to="{ name: 'AdminPage' }">League Managment</b-nav-item>

          </div>
          <b-nav-item :to="{ name: 'about' }">About</b-nav-item>

          <b-nav-item-dropdown right v-if="$root.store.username">
            <template #button-content>Personal </template>
            <b-dropdown-item :to="{ name: 'FavPlayers' }">
              Fav Players
            </b-dropdown-item>
            <b-dropdown-item :to="{ name: 'FavGames' }"
              >Fav Games
            </b-dropdown-item>
            <b-dropdown-item :to="{ name: 'FavTeams' }"
              >Fav Teams
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon icon="person-fill"></b-icon> Hello Guest!
            </template>
            <b-dropdown-item :to="{ name: 'login' }"
              >login <b-icon icon="arrow-bar-right"></b-icon>
            </b-dropdown-item>
            <b-dropdown-item :to="{ name: 'register' }"
              >Register <b-icon icon="arrow90deg-up"></b-icon
            ></b-dropdown-item>

          </b-nav-item-dropdown>

          <!-- <b-nav-text>Welcome Guest!</b-nav-text>
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item> -->
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon icon="person-fill"></b-icon> Hello
              {{ $root.store.username }}!
            </template>
            <b-dropdown-item href="#">Personal Site</b-dropdown-item>
            <b-dropdown-item @click="Logout">
              Log Out <b-icon icon="arrow-bar-left"></b-icon
            ></b-dropdown-item>
          </b-nav-item-dropdown>
                  <!-- <b-nav-item :to="{ name: 'About' }">About</b-nav-item> -->

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      form: {
        submitError: undefined,
      },
    };
  },
  methods: {
    async Logout() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/logout",
          {}
        );
      sessionStorage.clear()
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
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
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
