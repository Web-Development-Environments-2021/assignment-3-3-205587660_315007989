<template>
  <div>
    <b-table
      striped
      hover
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :fields="fields"
      :items="items"
    >
      <template #cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>


      <template #cell(homeTeamName)="data">
        <span v-html="data.value"></span>
      </template>
          <template #cell(awayTeamName)="data">
        <span v-html="data.value"></span>
      </template>


      <template #cell(EventLog)="row">
        <fav-button  v-if= !isOld(row) :id="row.item.gameID" Type="matches"></fav-button>
        <b-button v-if= isOld(row) size="sm" @click="info(row, $event.target)" class="mr-1">
          Info modal
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      ok-only
      @hide="resetInfoModal"
    >
      <GameEvent :id="infoModal.content"></GameEvent>
    </b-modal>
  </div>
</template>

<script>
import GameEvent from "../components/GameEvent.vue";
import FavButton from './FavButton.vue';

export default {
  name: "GameTable",
  components: {
    GameEvent,
    FavButton,
  },

  data() {
    return {
      fields: [
        { key: `gameID`, sortable: true },
        { key: `homeTeam`, sortable: true },
        { key: `awayTeam`, sortable: true },
        { key: `homeScore`, sortable: true },
        { key: `awayScore`, sortable: true },
        { key: `stadium`, sortable: true },
        { key: `referee`, sortable: true },
        { key: `stage`, sortable: true },
        { key: `homeTeamName`, sortable: true },
        { key: `awayTeamName`, sortable: true },
        { key: `gameDate`, sortable: true },
        { key: `hour`, sortable: true },
        { key: `EventLog` },
      ],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      items: [],
    };
  },
  props: {
    results: {
      type: Array,
      required: true,
    },
  },
  methods: {
    isOld(element){
      var today = new Date();
      today = today.toISOString();
      return element.item.gameDate < today
    },
    info(item, button) {
      this.infoModal.title = `Game Evnets`;
      this.infoModal.content = item.item.gameID;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    updateTable() {
      let res = this.results;
      var today = new Date();
      today = today.toISOString();
      res.forEach((element) => {
        element.EventLog = "";
        if (element.gameDate < today) {
          element.EventLog = `pass`;
        }
        element.homeTeamName = `<a href="#/Team/${element.homeTeam}" class="" target="_self"> ${element.homeTeamName}</a>`;
        element.awayTeamName = `<a href="#/Team/${element.awayTeam}" class="" target="_self"> ${element.awayTeamName}</a>`;

        element.gameDate = element.gameDate.substring(0, 10);
        element.hour = element.hour.substring(11, 16);
      });
      this.items = res;
    },
  },
  mounted() {
    this.updateTable();
  },
};
</script>
