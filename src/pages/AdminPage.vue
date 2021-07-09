<template>
  <div>
    <h1 class="title">All Games </h1>
    <div id="app">



  
        <div >
          <button type="button" class="btn btn-primary" @click="AddGame">Add Game</button>
          <AddGame>

          </AddGame>
          <GameTable v-if="this.results && this.results.length>0" :results="results"> </GameTable>
  <svg src="https://www.superliga.dk/sites/all/themes/superliga/img/logo-superliga.svg" fluid alt="Responsive image"></svg>

        </div>
      </div>
    </div>

</template>


<script>
import GameTable from "../components/GameTable.vue";
// import AddGame from "../pages/AddGame.vue";
export default {

  name: "games",
  components: {
GameTable,
  },

  data() {
    return {
        results:[],
      }
      
    
  },
    mounted() {
        this.GetAllGames();
},
  methods: {
         async GetAllGames() {
             var response=[];
             response = await this.axios.get(`http://localhost:3000/game/allGames`);
          this.results = response.data;
          console.log(response.data)
    },
    async AddGame(){
              this.$router.push("/AddGame");
    } 

  },
};
</script>

<style scoped>
search-input {
  margin-left: 20px;
  width: 500px;
}
.dropdown {
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.dropdown span {
  display: inline-block;
  width: 80px;
}
</style>