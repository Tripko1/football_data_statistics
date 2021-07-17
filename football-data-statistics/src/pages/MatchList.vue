<template>
  <base-card>
    <div class="search">Search</div>
    <div class="matches">
      <table>
        <thead>
          <tr>
            <th>Matchday</th>
            <th>Home Team</th>
            <th>Result</th>
            <th>Away Team</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody v-if="matches">
          <tr v-for="match in matches" :key="match.id">
            <td class="col">{{ match.matchday }}</td>

            <td class="teamName_home">
              <router-link :to="'/team/' + match.homeTeam.id">
                <span>{{ match.homeTeam.name }}</span>
              </router-link>
            </td>

            <td :class="getResultClass(match.score.fullTime.homeTeam)">
              <span
                >{{ match.score.fullTime.homeTeam }} -
                {{ match.score.fullTime.awayTeam }}</span
              >
              <aside class="aside" v-if="match.score.penalties.homeTeam">
                <span>
                  ({{ match.score.penalties.homeTeam }} -
                  {{ match.score.penalties.awayTeam }})
                </span>
              </aside>
            </td>

            <td class="teamName_away">
              <router-link :to="'/team/' + match.awayTeam.id">
                <span>{{ match.awayTeam.name }}</span>
              </router-link>
            </td>

            <td class="date">{{ match.utcDate.split("T")[0] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <the-pagination></the-pagination>
  </base-card>
</template>

<script>
import ThePagination from "../components/UI/ThePagination.vue";
export default {
  components: {
    ThePagination,
  },
  computed: {
    selectedId() {
      return this.$store.getters["comps/selectedId"];
    },
    matches() {
      return this.$store.getters["match/getMatchesInView"];
    },
  },
  methods: {
    getResultClass(arg) {
      if (arg !== null) {
        return "result finished";
      }
      return "result";
    },
  },
  created() {
    this.$store.dispatch("match/allMatches", { id: this.selectedId });
  },
};
</script>

<style scoped>
.search {
  height: 50px;
}
.matches {
  height: calc(100% - 120px);
  overflow-y: auto;
  overflow-x: auto;
}
table {
  width: calc(100% - 20px);
  margin: auto;
  text-align: center;
  font-size: 1.5rem;
  border-spacing: 0;
  margin: 0 10px 10px 10px;
}
table thead {
  background-color: #fbfbfb;
}

.teamName_home {
  min-width: 250px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  padding: 2px;
  border-bottom: 1px solid #2c3e50;
}
.teamName_away {
  min-width: 250px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  padding: 2px;
  border-bottom: 1px solid #2c3e50;
}

a {
  color: #2c3e50;
  text-decoration: none;
}

.date {
  min-width: 100px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.col {
  max-width: 20px;
  text-align: center;
}

.result {
  min-width: 30px;
  text-align: center;
}

.finished {
  border: 1px solid black;
  border-radius: 5px;
}

.aside {
  width: 100%;
  display: table;
}
</style>
