<template>
  <base-card v-if="errorMessage">
    <div class="errorMessage">{{ errorMessage }}</div>
  </base-card>
  <base-card v-else>
    <div v-for="stand in standings" :key="setKey(stand.group)">
      <div class="group_name" v-if="stand !== null">
        <strong>{{ stand.group }}</strong>
      </div>
      <div class="table">
        <leaderboard-header></leaderboard-header>
        <leaderboard-row
          v-for="table in stand.table"
          :key="table.position"
          :table="table"
        ></leaderboard-row>
      </div>
    </div>
  </base-card>
</template>

<script>
import LeaderboardHeader from "../components/leaderboard/LeaderboardHeader.vue";
import LeaderboardRow from "../components/leaderboard/LeaderboardRow.vue";
export default {
  components: {
    LeaderboardHeader,
    LeaderboardRow,
  },
  computed: {
    standings() {
      return this.$store.getters["lead/getStandings"];
    },
    selectedId() {
      return this.$store.getters["comps/selectedId"];
    },
    errorMessage() {
      return this.$store.getters["lead/getError"];
    },
  },
  methods: {
    setKey(key) {
      if (key !== null) {
        return key;
      }
      return "1";
    },
  },
  created() {
    return this.$store.dispatch("lead/getLeaderBoard", { id: this.selectedId });
  },
};
</script>

<style scoped>
.group_name {
  border-bottom: 2px solid #2c3e50;
  padding-top: 6px;
  padding-left: 10px;
  width: calc(100% - 10px);
  height: 20px;
  text-align: left;
}

.table {
  padding: 5px;
  overflow-x: auto;
  overflow-y: auto;
}

.errorMessage {
  padding-top: 40px;
  color: #2c3e50;
  font-size: 30px;
}

/* width */
::-webkit-scrollbar {
  width: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(96, 96, 96);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(96, 96, 96) rgb(169, 169, 169);
}
</style>
