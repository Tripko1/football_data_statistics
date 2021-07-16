<template>
  <div v-if="errorMessage" class="errorMessage">{{ errorMessage }}</div>
  <base-card v-else>
    <div v-for="stand in standings" :key="stand.stage" class="main">
      <div class="group_name" v-if="stand !== null">
        <strong>{{ stand.group }}</strong>
      </div>
      <table>
        <thead>
          <tr>
            <td>Position</td>
            <td>Club</td>
            <td>Played</td>
            <td>Won</td>
            <td>Drawn</td>
            <td>Lost</td>
            <td><abbr title="Goals For">GF</abbr></td>
            <td><abbr title="Goals Against">GA</abbr></td>
            <td><abbr title="Goals Difference">GD</abbr></td>
            <td>Points</td>
          </tr>
        </thead>
        <tbody v-for="table in stand.table" :key="table.position">
          <tr>
            <td>{{ table.position }}.</td>
            <td class="club">
              <span><img :src="table.team.crestUrl" alt=""/></span>
              <span>{{ table.team.name }}</span>
            </td>
            <td>{{ table.playedGames }}</td>
            <td>{{ table.won }}</td>
            <td>{{ table.draw }}</td>
            <td>{{ table.lost }}</td>
            <td>{{ table.goalsFor }}</td>
            <td>{{ table.goalsAgainst }}</td>
            <td>{{ table.goalDifference }}</td>
            <td>
              <strong>{{ table.points }}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </base-card>
</template>

<script>
export default {
  computed: {
    standings() {
      return this.$store.getters["lead/getStandings"];
    },
    errorMessage() {
      return this.$store.getters["lead/getError"];
    },
  },
  created() {
    return this.$store.dispatch("lead/getLeaderBoard");
  },
};
</script>

<style scoped>
.main {
  border-bottom: 2px solid #2c3e50;
  padding-top: 6px;
}
table {
  width: 100%;
  margin: auto;
  text-align: center;
  font-size: 1.5rem;
  border-collapse: inherit;
  border-spacing: 0;
}
table thead {
  background-color: #fbfbfb;
}

table thead tr td {
  padding: 5px 20px;
}

table tbody {
  margin-bottom: 10px;
}

table tbody td {
  padding: 5px 0;
}
.group_name {
  text-align: left;
  font-size: 150%;
}
img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 15px;
}

.club {
  max-width: 250px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.errorMessage {
  padding-top: 40px;
  color: white;
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
