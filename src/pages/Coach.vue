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
@import url(https://fonts.googleapis.com/css?family=Chewy);
.snip1336 {
font-family: 'Chewy';
  position: relative;
  overflow: hidden;
  margin: 10px;
  min-width: 230px;
  max-width: 500px;
  width: 100%;
  color: #ffffff;
  text-align: left;
  line-height: 1.4em;
  background-color: #141414;
  width:300%;
}
.snip1336 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
}
.snip1336 img {
  width: fit-content;
  max-width: 400%;
  vertical-align: top;
  opacity: 0.85;
}
.snip1336 figcaption {
  width: 100%;
  background-color: #141414;
  padding: 25px;
  position: relative;
}
.snip1336 figcaption:before {
  position: absolute;
  content: '';
  bottom: 100%;
  left: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 55px 0 0 400px;
  border-color: transparent transparent transparent #141414;
}
.snip1336 figcaption a {
  padding: 5px;
  /* border: 1px solid #ffffff; */
  color:inherit;
  font-size: 0.7em;
  text-transform: uppercase;
  margin: 10px 0;
  display: inline-block;
  /* opacity: 0.65; */
  width: 47%;

  /* text-align: center; */
  text-decoration: underline;
  font-weight: 600;
  letter-spacing: 1px;
}
.snip1336 figcaption a:hover {
  opacity: 1;
}
.snip1336 .profile {
  border-radius: 50%;
  position: absolute;
  bottom: 100%;
  left: 25px;
  z-index: 1;
  max-width: 90px;
  opacity: 1;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}
.snip1336 .follow {
  margin-right: 4%;
  border-color: #2980b9;
  color: #2980b9;
}
.snip1336 h2 {
  margin: 0 0 5px;
  font-weight: 300;
}
.snip1336 h2 span {
  display: block;
  font-size: 0.5em;
  color: #2980b9;
}
.snip1336 p {
  margin: 0 0 10px;
  font-size: 0.8em;
  letter-spacing: 1px;
  opacity: 0.8;
}

</style>
