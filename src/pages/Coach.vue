<template>
  <div class="coach-preview">
    <b-card>
      <b-card-img class="float-right" :src="Photo" img-left></b-card-img>

      <b-card-text>
        <div :title="id" class="coach-title">
          <b> Coach Id:</b> {{ id }}
          <!-- <b-div v-b-hover="handleHover">
            <b-icon
              v-b-tooltip.hover
              title="Remove from Favorite"
              v-if="isHovered"
              icon="heart"
              @click="RemoveFav"
            >
            </b-icon>
            <b-icon v-else id="heart" icon="heart-fill"></b-icon
          ></b-div> -->
          <h1>{{ TeamName }} </h1>
          <h3>{{ FullName }}</h3>
        </div>
        <ul class="coach-content">
          <li>Full Name: {{ FullName }}</li>
          <li>Team Name: {{ TeamName }}</li>
          <li>Position: {{ Position }}</li>
          <li>birth_date: {{ birth_date }}</li>
          <li>nationality: {{ nationality }}</li>
          <li>birthcountry: {{ birthcountry }}</li>
        </ul>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHovered: false,
    };
  },
  name: "CoachDetial",
  props: {
    id: {
      type: Number,
      required: true,
    },
    FullName: {
      type: String,
      required: true,
    },
    TeamName: {
      type: String,
      required: true,
    },
    Photo: {
      type: String,
      required: true,
    },
    Position: {
      type: String,
      required: true,
    },
    // CommonName: {},
    nationality: {
      type: String,
      required: true,
    },
    birth_date: {
      type: String,
      required: true,
    },
    birthcountry: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.getCoach();
  },
  methods: {
    async RemoveFav() {
      try {
        // var url =`http://localhost:3000/homepage/favoritecoach/${this.id}`;
        // const response = await this.axios.delete(url,{},{});
        this.$parent.coachs = this.$parent.coachs.filter(
          (obj) => obj.coach_id !== this.id
        );
        this.$root.toast(
          "Removed from favorites",
          `${this.FullName} Removed from favorites `,
          "success"
        );
      } catch (err) {
        console.log(err);
      }
    },
    handleHover(hovered) {
      this.isHovered = hovered;
    },

    loadData(data) {
      this.FullName = data.name;
      this.id = data.coach_id;
      this.FullName = data.name;
      this.TeamName = data.team_name;
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
        // this.FullName=response.data.name
        console.log(this);
        this.loadData(response.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
.coach-preview {
  display: inline-block;
  width: 500px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue;
}

.coach-preview .coach-title {
  text-align: left;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.coach-preview .coach-content {
  width: 100%;
  overflow: hidden;
}
</style>
