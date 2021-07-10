<template>
  <div class="coach-preview">

<figure class="snip1336">
  <img src='@/assets/testpic.jpg' >
  <figcaption>
    <img :src="Photo" alt="profile-sample4" class="profile" />
          <div :title="id" class="coach-title">
          <h4>Name:{{ this.FullName}}</h4>
          <h4> Coach ID:{{ this.id }}</h4> 
           <h4>Team Name:<b-link :to="{ name: 'Team', params: { id: team_id } }">{{ TeamName }}</b-link></h4> 
          <h4>birth_date: {{ birth_date }}</h4>
          <h4>nationality: {{ nationality }}</h4>
          <h4>birthcountry: {{ birthcountry }}</h4>
          </div>

  </figcaption>
</figure>

</div>

    <!-- <b-card>
      <b-card-img class="float-right" :src="Photo" img-left></b-card-img>

      <b-card-text>
        <div :title="id" class="coach-title">
          <b> Coach Id:</b> {{ id }}
          <h1>{{ TeamName }}</h1>
          <h3>{{ FullName }}</h3>
        </div>
        <ul class="coach-content">
          <li>Full Name: {{ FullName }}</li>
          <li>
            Team Name:
            <b-link :to="{ name: 'Team', params: { id: team_id } }">
              {{ TeamName }}</b-link
            >
          </li>
          <li>birth_date: {{ birth_date }}</li>
          <li>nationality: {{ nationality }}</li>
          <li>birthcountry: {{ birthcountry }}</li>
        </ul>
      </b-card-text>
    </b-card> -->
  
</template>

<script>

export default {
  data() {
    return {
      isHovered: false,
      id:"",
      FullName:"",
      TeamName:"",
      team_id: "",
      Photo: "",
      Position: "",
      nationality: "",
      birth_date: "",
      birthcountry: "",
    };
  },
  name: "CoachDetial",
  props: {},    

  mounted() {
    this.getCoach();
  },
  methods: {
    loadData(data) {
      this.FullName = data.name;
      this.id = data.coach_id;
      this.FullName = data.name;
      this.TeamName = data.team_name;
      this.team_id = data.team_id;
      this.Photo = data.image;
      this.nationality = data.nationality;
      this.birth_date = data.birth_date;
      this.birthcountry = data.birthcountry;
    },

    async getCoach() {
      try {
        const coach_id = this.$route.params.id;
        console.log(`coach ID number ${coach_id}`);
        const url = `http://localhost:3000/coach/coachDetailById/${coach_id}`;
        const response = await this.axios.get(url);
        console.log(response);
        console.log(response.data.name);
        console.log(this);
        this.loadData(response.data);
                console.log(this.TeamName);

      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
  @import '../assets/styles/Players.css';


</style>
